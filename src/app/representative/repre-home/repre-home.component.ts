import { Component } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models/interfaces/auth.interface';

@Component({
  selector: 'app-repre-home',
  imports: [],
  templateUrl: './repre-home.component.html',
  styleUrl: './repre-home.component.css',
})
export class RepreHomeComponent {
  public user!: User;
  constructor(private _userService: UserService) {
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
}
