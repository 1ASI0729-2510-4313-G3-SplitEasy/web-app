import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-bar-member',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']  // Fíjate que era styleUrls, no styleUrl
})
export class SideBarMemberComponent {
  userName = 'John Doe';

  constructor(private router: Router) {}  // Inyecta Router aquí

  logout() {
    localStorage.removeItem('mockUser');
    this.router.navigate(['/home']);
  }
}
