import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-contactus-section',
  templateUrl: './contactus-section.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./contactus-section.component.css']
})
export class ContactusSectionComponent {
  nombre: string = '';
  correo: string = '';
  numero: string = '';

  enviarFormulario() {
    alert(`Thanks for contacting us, ${this.nombre}!\nWe will reply to your email: ${this.correo}.`);
  }
}
