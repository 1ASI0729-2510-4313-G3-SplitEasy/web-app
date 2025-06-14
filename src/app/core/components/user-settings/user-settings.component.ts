import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/interfaces/auth.interface';

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent {
  userForm!: FormGroup;
  userPasswordForm!: FormGroup;
  activateEditUser!: boolean;
  activateEditUserPassword!: boolean;
  user!: User;

  constructor(private fb: FormBuilder, private _userService: UserService) {
    const userLocal = localStorage.getItem('currentUser');
    this.loadForm();
    if (userLocal) {
      this.user = JSON.parse(userLocal);
      this._userService.getById(this.user.id).subscribe({
        next: (res) => {
          this.user = res;
          this.cancelUser();
        },
        error: (err) => {
          alert('error get data user');
        },
      });
    } else {
      alert('user not session');
    }
  }
  private loadForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
    });

    this.userPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }
  public editUser() {
    this.activateEditUser = true;
    this.userForm.enable();
  }
  public saveUser() {
    if (this.userForm.valid) {
      const userFormValue: User = this.userForm.value;
      this._userService
        .updateUser(
          this.user.id,
          userFormValue.email,
          userFormValue.role,
          userFormValue.firstName,
          userFormValue.lastName,
          userFormValue.salary
        )
        .subscribe({
          next: (res) => {
            this.user = res;
            alert('Data user Update Succesfull');
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.cancelUser();
          },
          error: () => {
            alert('erro al actualizar');
            this.cancelUser();
          },
        });
    } else {
    }
  }
  public cancelUser() {
    this.activateEditUser = false;
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      role: [this.user.role, [Validators.required]],
      salary: [this.user.salary, [Validators.required, Validators.min(0)]],
    });
    this.userForm.disable();
  }

  public editPasswordUser() {
    this.activateEditUserPassword = true;
  }
  public savePasswordUser() {
    const userPasswordFormValue = this.userPasswordForm.value;
    if (
      this.userPasswordForm.valid &&
      userPasswordFormValue.password === userPasswordFormValue.repeatPassword
    ) {
      this._userService
        .updateUserPassword(this.user.id, userPasswordFormValue.password)
        .subscribe({
          next: (res) => {
            alert('change password succesfull');
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.cancelPasswordUser();
          },
          error: (err) => {
            alert('erro to change password');
            this.cancelPasswordUser();
          },
        });
    } else {
    }
  }
  public cancelPasswordUser() {
    this.userPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
    this.activateEditUserPassword = false;
  }
}
