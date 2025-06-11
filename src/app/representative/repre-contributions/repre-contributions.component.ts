import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../core/services/periods/periods.service';
import { User } from '../../core/models/interfaces/auth.interface';
import { Period } from '../../core/models/interfaces/period.interface';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Contribution } from '../../core/models/interfaces/contribution.interface';
import { ContributionsService } from '../../core/services/contributions/contributions.service';
import { StatusContribution } from '../../core/models/enums/contribution.enum';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-repre-contributions',
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './repre-contributions.component.html',
  styleUrl: './repre-contributions.component.css',
})
export class RepreContributionsComponent implements OnInit {
  private user_id: string;
  private house_id: string;
  public periodList!: Period[];
  public period_id!: string;
  public contributionsList!: Contribution[];
  public memberList!: User[];
  public contributionForm!: FormGroup;
  public activateForm!: boolean;
  public activateFormEdit!: boolean;
  public statusEnum = StatusContribution;

  constructor(
    private _periodServices: PeriodsService,
    private _contributionService: ContributionsService,
    private _memberService: UserService,
    private fb: FormBuilder
  ) {
    const userLocal = localStorage.getItem('currentUser');
    const houseLocal = localStorage.getItem('currentHouse');
    const user: User = JSON.parse(userLocal || '');
    this.house_id = houseLocal || '';
    this.user_id = user ? user.id : '';
    this._periodServices
      .getAll('owner_id=' + this.user_id + '&house_id=' + this.house_id)
      .subscribe({
        next: (res) => {
          this.periodList = res;

          this.period_id =
            this.periodList.filter((x) => {
              const currentDate = new Date();
              return (
                new Date(x.dateInit) <= currentDate &&
                new Date(x.dateDue) >= currentDate
              );
            })[0].id || '0';
        },
      });
    this.initFormclean();
    this.loadData();
  }

  initFormclean() {
    this.contributionForm = this.fb.group({
      user_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      amount: [0, Validators.required],
      currency: ['', Validators.required],
      status: [StatusContribution.PENDING, Validators.required],
      dateDue: ['', Validators.required],
      id: [''],
      is_billing: [true, Validators.required],
    });
  }

  ngOnInit() {
    console.log('hola');
  }

  private loadData() {
    this._contributionService.getAllByHouse(this.house_id).subscribe({
      next: (res) => {
        this.contributionsList = res;
        this._memberService.getAllByHouse(this.house_id).subscribe({
          next: (res) => {
            this.memberList = res;
            this.contributionsList = this.contributionsList.map((c) => {
              const member: User =
                this.memberList.find((x) => (x.id = c.user_id)) || ({} as User);
              return {
                memberName: member.firstName + ' ' + member.lastName,
                ...c,
              };
            });
          },
          error: (err) => {
            alert('Failed data list member');
          },
        });
      },
      error: (err) => {
        alert('Failed data list contribution');
      },
    });
  }

  public initform() {
    this.activateForm = !this.activateForm;
    this.initFormclean();
    this.activateFormEdit = false;
  }

  public editTable(contribution: Contribution) {
    this.contributionForm = this.fb.group({
      user_id: [contribution.user_id, Validators.required],
      descripcion: [contribution.descripcion, Validators.required],
      amount: [contribution.amount, Validators.required],
      currency: [contribution.currency, Validators.required],
      status: [contribution.status, Validators.required],
      dateDue: [contribution.dateDue, Validators.required],
      id: [contribution.id],
      is_billing: [contribution.is_billing, Validators.required],
    });
    this.activateForm = true;
    this.activateFormEdit = true;
  }

  public saveContribution() {
    const valueForm: Contribution = this.contributionForm.value;
    if (this.contributionForm.valid) {
      if (!valueForm.id) {
        this._contributionService
          .create(
            this.user_id,
            valueForm.descripcion,
            valueForm.amount,
            valueForm.user_id,
            valueForm.currency,
            this.house_id,
            this.period_id,
            valueForm.is_billing
          )
          .subscribe({
            next: (res) => {
              this.initform();
              this.loadData();
            },
            error: (err) => {
              alert('error create Contribution');
            },
          });
      } else {
        this._contributionService
          .update(
            valueForm.id,
            valueForm.user_id,
            valueForm.descripcion,
            valueForm.amount,
            valueForm.currency,
            this.house_id,
            this.period_id,
            valueForm.is_billing
          )
          .subscribe({
            next: (res) => {
              this.loadData();
              this.initform();
            },
            error: (err) => {
              alert('error update Contribution ' + valueForm.descripcion);
            },
          });
      }
    } else {
      alert('data not valid');
    }
  }
  public deleteContribution(contribution_id: string) {
    this._contributionService.delete(contribution_id).subscribe({
      next: (res) => {
        this.loadData();
      },
      error: (err) => {
        alert('error delete Contribution ');
      },
    });
  }
}
