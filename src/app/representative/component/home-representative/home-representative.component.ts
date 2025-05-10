import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {TheFooterComponent} from '../../../core/component/the-footer/the-footer.component';

@Component({
  selector: 'app-home-representative',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './home-representative.component.html',
  styleUrl: './home-representative.component.css'
})
export class HomeRepresentativeComponent {
  representanteName = 'John Doe';
  nombreHogar = 'Hogar Doe';
  totalContribuido = 1200.50;
  totalMiembros = 5;

  ultimaFactura = {
    descripcion: 'Compra del supermercado',
    monto: 230.75
  };

  constructor(private router: Router) {}

  irAMiembros() {
    this.router.navigate(['/representative/members']);
  }

  irAGastos() {
    this.router.navigate(['/representative/bills']);
  }

  irAContribuciones() {
    this.router.navigate(['/representative/contributions']);
  }
}
