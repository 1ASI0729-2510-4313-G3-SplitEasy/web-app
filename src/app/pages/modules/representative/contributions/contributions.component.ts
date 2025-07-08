import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ContributionsService } from '../../services/contributions.service';
import { environment } from '../../../../core/environments/environment';
import { Contribution, CreateContributionRequest } from '../../interfaces/contributions';
import { User } from '../../../../core/interfaces/auth';
import { AuthService } from '../../../../core/services/auth.service';
import { HouseholdService } from '../../services/household.service';
import { HouseholdMemberService } from '../../services/household-member.service';
import { BillsService } from '../../services/bills.service';
import { MemberContributionService } from '../../services/member-contribution.service';

@Component({
  selector: 'app-contributions',
  standalone: false,
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.css'
})
export class ContributionsComponent implements OnInit {
  householdId = 0;
  contributions: any[] = [];
  bills: any[] = [];
  members: any[] = [];
  miembros: any[] = []; // Para el multiSelect
  currentUser!: User;
  loading = true;
  showForm = false;
  mostrarDialogo = false; // Para el dialog
  contributionForm!: FormGroup;

  // Opciones para el dropdown de estrategias
  estrategias = [
    { label: 'Igualitaria', value: 'EQUAL' },
    { label: 'Según Ingresos', value: 'INCOME_BASED' }
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private contributionsService: ContributionsService,
    private householdService: HouseholdService,
    private householdMemberService: HouseholdMemberService,
    private authService: AuthService,
    private billService: BillsService,
    private memberContributionService: MemberContributionService
  ) { }

  ngOnInit() {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) {
      console.error('No se encontró información del usuario actual');
      return;
    }

    this.currentUser = JSON.parse(currentUserData);

    // Inicializar el formulario con los campos correctos
    this.contributionForm = this.fb.group({
      billId: [null, Validators.required],
      description: ['', Validators.required],
      fechaLimite: [null, Validators.required],
      strategy: ['EQUAL', Validators.required],
      miembros: [[], Validators.required] // Para el multiSelect
    });

    this.householdService.getHouseholdByRepresentante(this.currentUser.id).subscribe(households => {
      const household = households[0];
      if (household) {
        this.householdId = household.id;

        forkJoin({
          hms: this.householdMemberService.getByHouseholdId(this.householdId),
          users: this.authService.getAllUsers(),
          bills: this.billService.getBillsByHousehold(this.householdId),
          contributions: this.contributionsService.getContributionsByHouseholdId(this.householdId),
          memberContributions: this.memberContributionService.getAll()
        }).subscribe(({ hms, users, bills, contributions, memberContributions }) => {
          this.bills = bills;
          const representative = users.find(u => u.id == this.currentUser.id);

          this.members = [
            ...hms.map(hm => ({
              ...hm,
              user: users.find(u => u.id == hm.userId)
            })),
            ...(representative ? [{
              userId: representative.id,
              householdId: this.householdId,
              user: representative
            }] : [])
          ];

          // ✅ FIX: Preparar miembros para el multiSelect con la estructura correcta
          this.miembros = this.members.map(m => ({
            id: m.userId,
            name: m.user?.username || 'Sin nombre', // ✅ Usar 'name' en lugar de 'username'
            role: m.user?.role || 'MIEMBRO'
          }));

          this.contributions = contributions
            .filter(c => this.bills.some(b => b.id === c.billId))
            .map(c => {
              const bill = this.bills.find(b => b.id === c.billId);
              const details = memberContributions
                .filter((mc: any) => mc.contribution_id == c.id)
                .map((mc: any) => ({
                  ...mc,
                  user: users.find(u => u.id == mc.member_id)
                }));

              const hasRep = representative ? details.some((d: any) => d.user?.id == representative.id) : false;

              if (representative && !hasRep) {
                const monto = this.calculateMontoFaltante(c, details, representative);
                details.push({
                  contribution_id: c.id,
                  member_id: representative.id,
                  monto,
                  status: 'PENDIENTE',
                  pagado_en: null,
                  user: representative
                });
              }

              return {
                ...c,
                montoTotal: bill?.monto ?? 0,
                details,
                expanded: false
              };
            });

          this.loading = false;
        });
      }
    });
  }

  // Método para abrir el diálogo (usado en el template)
  abrirDialogo() {
    this.contributionForm.reset({
      billId: null,
      description: '',
      fechaLimite: null,
      strategy: 'EQUAL',
      miembros: []
    });
    this.mostrarDialogo = true;
  }

  // Método para cerrar el diálogo
  cerrarDialogo() {
    this.mostrarDialogo = false;
  }

  // ✅ MÉTODO CORREGIDO: guardarContribution()
  guardarContribution() {
    if (this.contributionForm.invalid) {
      console.error('Formulario inválido:', this.contributionForm.errors);
      return;
    }

    this.loading = true; // Activar loading durante el proceso

    const formValue = this.contributionForm.value;

    // ✅ CORRECCIÓN 1: Formatear correctamente la fecha
    let formattedDate: string;
    if (formValue.fechaLimite instanceof Date) {
      formattedDate = formValue.fechaLimite.toISOString().split('T')[0];
    } else if (typeof formValue.fechaLimite === 'string') {
      // Si ya es string, verificar formato
      const dateObj = new Date(formValue.fechaLimite);
      formattedDate = dateObj.toISOString().split('T')[0];
    } else {
      console.error('Formato de fecha inválido:', formValue.fechaLimite);
      this.loading = false;
      return;
    }

    // ✅ CORRECCIÓN 2: Crear el request exactamente como espera el backend
    const createRequest: CreateContributionRequest = {
      billId: Number(formValue.billId), // Asegurar que es number
      householdId: Number(this.householdId), // Asegurar que es number
      description: String(formValue.description).trim(), // Asegurar que es string
      strategy: String(formValue.strategy), // Asegurar que es string
      fechaLimite: formattedDate // Formato YYYY-MM-DD
    };

    console.log('📤 Enviando request:', createRequest);
    console.log('📤 URL del endpoint:', `${environment.urlBackend}/contributions`);

    // ✅ CORRECCIÓN 3: Usar el servicio con manejo de errores mejorado
    this.contributionsService.createContribution(createRequest).subscribe({
      next: (savedContribution: Contribution) => {
        console.log('✅ Contribución creada exitosamente:', savedContribution);

        // Obtener miembros seleccionados
        const selectedMembers = this.members.filter(m =>
          formValue.miembros.includes(m.userId)
        );

        if (selectedMembers.length === 0) {
          console.error('❌ No se seleccionaron miembros');
          this.loading = false;
          return;
        }

        // Obtener el monto total de la factura
        const bill = this.bills.find(b => b.id === formValue.billId);
        const montoTotal = bill?.monto || 0;

        if (montoTotal <= 0) {
          console.error('❌ El monto de la factura debe ser mayor a 0');
          this.loading = false;
          return;
        }

        // Crear las contribuciones individuales para cada miembro
        const memberContributions = this.calculateDivisionForSelected(
          montoTotal,
          formValue.strategy,
          savedContribution.id,
          selectedMembers
        );

        console.log('📤 Enviando contribuciones de miembros:', memberContributions);

        // ✅ CORRECCIÓN 4: Usar el servicio para crear las contribuciones de miembros
        const requests = memberContributions.map(mc =>
          this.memberContributionService.create(mc)
        );

        forkJoin(requests).subscribe({
          next: (results) => {
            console.log('✅ Contribuciones de miembros creadas:', results);
            // Mostrar mensaje de éxito (opcional)
            // this.messageService.add({
            //   severity: 'success',
            //   summary: 'Éxito',
            //   detail: 'Contribución creada exitosamente'
            // });
            this.ngOnInit(); // Recargar datos
            this.mostrarDialogo = false;
            this.loading = false;
          },
          error: (error) => {
            console.error('❌ Error al crear contribuciones de miembros:', error);
            console.error('❌ Detalles del error:', error.error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('❌ Error al crear contribución:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Error body:', error.error);
        console.error('❌ URL:', error.url);

        // Mostrar mensaje de error más específico
        let errorMessage = 'Error desconocido al crear la contribución';
        if (error.status === 400) {
          errorMessage = 'Datos inválidos proporcionados';
        } else if (error.status === 401) {
          errorMessage = 'No autorizado para realizar esta acción';
        } else if (error.status === 404) {
          errorMessage = 'Recurso no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }

        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: errorMessage
        // });

        this.loading = false;
      }
    });
  }

  // ✅ Método para calcular el monto faltante del representante
  private calculateMontoFaltante(contribution: any, details: any[], representative: User): number {
    const bill = this.bills.find(b => b.id === contribution.billId);
    const montoTotal = bill?.monto || 0;

    // Calcular el monto ya asignado a otros miembros
    const montoAsignado = details.reduce((sum, detail) => sum + (detail.monto || 0), 0);

    // El representante paga lo que falta
    return montoTotal - montoAsignado;
  }

  // ✅ Método para calcular la división entre miembros seleccionados
  private calculateDivisionForSelected(
    montoTotal: number,
    strategy: string,
    contributionId: number,
    selectedMembers: any[]
  ): any[] {
    const memberContributions: any[] = [];

    if (strategy === 'EQUAL') {
      // División igualitaria
      const montoPorMiembro = montoTotal / selectedMembers.length;

      selectedMembers.forEach(member => {
        memberContributions.push({
          contribution_id: contributionId,
          member_id: member.userId,
          monto: Math.round(montoPorMiembro * 100) / 100, // Redondear a 2 decimales
          status: 'PENDIENTE',
          pagado_en: null
        });
      });
    } else if (strategy === 'INCOME_BASED') {
      // División basada en ingresos
      // Obtener los ingresos de cada miembro
      const totalIngresos = selectedMembers.reduce((sum, member) => {
        return sum + (member.user?.ingresos || 0);
      }, 0);

      if (totalIngresos > 0) {
        selectedMembers.forEach(member => {
          const ingresosMiembro = member.user?.ingresos || 0;
          const porcentaje = ingresosMiembro / totalIngresos;
          const montoMiembro = montoTotal * porcentaje;

          memberContributions.push({
            contribution_id: contributionId,
            member_id: member.userId,
            monto: Math.round(montoMiembro * 100) / 100, // Redondear a 2 decimales
            status: 'PENDIENTE',
            pagado_en: null
          });
        });
      } else {
        // Si no hay ingresos registrados, fallback a división igualitaria
        console.warn('No hay ingresos registrados, usando división igualitaria');
        return this.calculateDivisionForSelected(montoTotal, 'EQUAL', contributionId, selectedMembers);
      }
    }

    return memberContributions;
  }

  get selectedBillMonto(): number {
    const billId = this.contributionForm.get('billId')?.value;
    return this.bills.find(b => b.id === billId)?.monto || 0;
  }


  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pagado':
        return 'p-tag-success';
      case 'pendiente':
        return 'p-tag-warning';
      case 'vencido':
        return 'p-tag-danger';
      default:
        return 'p-tag-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pagado':
        return 'Pagado';
      case 'pendiente':
        return 'Pendiente';
      case 'vencido':
        return 'Vencido';
      default:
        return status || 'Sin estado';
    }
  }

}
