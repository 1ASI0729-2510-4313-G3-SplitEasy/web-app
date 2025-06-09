import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../core/models/interfaces/auth.interface';
import { UserService } from '../../core/services/user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-side-bar-member',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'], // Fíjate que era styleUrls, no styleUrl
})
export class SideBarMemberComponent {
  public user!: User;

  constructor(private router: Router, private _userService: UserService) {
    this.loadData();
  }

  private loadData() {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal) {
      const user: User = JSON.parse(userLocal);
      this._userService.getById(user.id).subscribe({
        next: (res: User) => {
          this.user = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  logout() {
    localStorage.removeItem('mockUser');
    this.router.navigate(['/home']);
  }
}
