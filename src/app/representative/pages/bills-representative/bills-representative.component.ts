import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-bills-representative',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './bills-representative.component.html',
  styleUrl: './bills-representative.component.css'
})
export class BillsRepresentativeComponent {
  bills = [
    {
      name: 'Electricidad Abril',
      date: new Date('2025-04-10'),
      registeredBy: 'Ana López',
      amount: 75.20
    },
    {
      name: 'Compra supermercado',
      date: new Date('2025-04-14'),
      registeredBy: 'Carlos Ruiz',
      amount: 152.00
    },
    {
      name: 'Compra supermercado',
      date: new Date('2025-04-14'),
      registeredBy: 'Jean Ruiz',
      amount: 252.00
    },
  ];

  viewBill(bill: any) {
    console.log('Ver gasto:', bill.name);
    // Aquí puedes navegar a detalle, como /expenses/:id
  }

  addBill() {
    console.log('Agregar nuevo gasto');
    // Abrir modal o redirigir a formulario
  }

}
