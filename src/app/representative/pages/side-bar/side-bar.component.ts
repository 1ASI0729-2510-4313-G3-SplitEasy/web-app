import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../shared/service/models/interfaces/auth.interface';

@Component({
  selector: 'app-side-bar-representative',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'], // Fíjate que era styleUrls, no styleUrl
})
export class SideBarRepresentativeComponent {
  public user!: User;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '');
  } // Inyecta Router aquí

  logout() {
    localStorage.removeItem('mockUser');
    this.router.navigate(['/home']);
  }
}
