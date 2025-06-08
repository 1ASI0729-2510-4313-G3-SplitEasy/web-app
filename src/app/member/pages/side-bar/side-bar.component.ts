import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../shared/service/models/interfaces/auth.interface';

@Component({
  selector: 'app-side-bar-member',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css', // Fíjate que era styleUrls, no styleUrl
})
export class SideBarMemberComponent {
  user!: User;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '');
  }

  logout() {
    localStorage.removeItem('mockUser');
    this.router.navigate(['/home']);
  }
}
