import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/interfaces/auth.interface';
import { Roles } from '../../models/enums/roles.enum';
import { FormsModule } from '@angular/forms';
import { House } from '../../models/interfaces/house.interface';
import { HousesService } from '../../services/houses/houses.service';

@Component({
  selector: 'app-side-bar-member',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    FormsModule,
    NgFor,
  ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'], // Fíjate que era styleUrls, no styleUrl
})
export class SideBarMemberComponent {
  public user!: User;
  public roles = Roles;
  public selectHouse!: string;
  public houseList!: House[];

  constructor(
    private router: Router,
    private _userService: UserService,
    private _houseService: HousesService
  ) {
    this.loadData();
  }

  private loadData() {
    const userLocal = localStorage.getItem('currentUser');
    this.selectHouse = localStorage.getItem('currentHouse') || '';

    if (userLocal) {
      const user: User = JSON.parse(userLocal);
      this._userService.getById(user.id).subscribe({
        next: (res: User) => {
          this.user = res;

          this._houseService.getAllByRepre(this.user.id).subscribe({
            next: (res) => {
              this.houseList = res;
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  public changeSelectHouse(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    localStorage.setItem('currentHouse', value);
    location.reload();
  }
}
