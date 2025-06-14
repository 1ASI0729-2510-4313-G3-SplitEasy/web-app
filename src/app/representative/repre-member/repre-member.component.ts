import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../core/models/interfaces/auth.interface';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Roles } from '../../core/models/enums/roles.enum';

@Component({
  selector: 'app-repre-member',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './repre-member.component.html',
  styleUrl: './repre-member.component.css',
})
export class RepreMemberComponent {
  private user_id: string;
  private house_id: string;
  public membersList!: User[];
  public activateForm!: boolean;
  public activateFormEdit!: boolean;
  public memberEditForm!: FormGroup;
  public memberRegisterForm!: FormGroup;

  constructor(
    private _memberService: UserService,
    private fb: FormBuilder,
    private _authService: AuthService
  ) {
    const userLocal = localStorage.getItem('currentUser');
    const houseLocal = localStorage.getItem('currentHouse');
    const user: User = JSON.parse(userLocal || '');
    this.house_id = houseLocal || '';
    this.user_id = user ? user.id : '';
    this.user_id = user ? user.id : '';
    this.initForms();
    this.loadData();
  }

  private initForms() {
    this.memberEditForm = this.fb.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      salary: [0, [Validators.required, Validators.min(0)]],
    });
    this.memberRegisterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
      role: ['member', [Validators.required]],
    });
  }

  private loadData() {
    this._memberService.getAllByHouse(this.house_id).subscribe({
      next: (res) => {
        this.membersList = res;
      },
      error: (err) => {
        alert('Failed data list member');
      },
    });
  }

  public initform() {
    this.activateForm = false;
    this.initForms();
    this.activateFormEdit = false;
  }
  public activeForm() {
    this.activateForm = true;
    this.initForms();
    this.activateFormEdit = false;
  }

  public editTable(member: User) {
    this.memberEditForm = this.fb.group({
      id: [member.id],
      firstName: [member.firstName, [Validators.required]],
      lastName: [member.lastName, [Validators.required]],
      salary: [member.salary, [Validators.required, Validators.min(0)]],
      email: [member.email, [Validators.required, Validators.email]],
    });
    this.activateFormEdit = true;
  }

  private editMember() {
    const valueForm: User = this.memberEditForm.value;
    if (this.memberEditForm.valid) {
      this._memberService
        .updateUser(
          valueForm.id,
          valueForm.email,
          Roles.MEMBER,
          valueForm.firstName,
          valueForm.lastName,
          valueForm.salary
        )
        .subscribe({
          next: (res) => {
            this.loadData();
            this.initform();
          },
          error: (err) => {
            alert('error update member ' + valueForm.firstName);
          },
        });
    } else {
      alert('data not valid');
    }
  }

  private registerMember() {
    const user = this.memberRegisterForm.value;
    if (
      this.memberRegisterForm.valid &&
      user.password === user.repeatPassword
    ) {
      this._authService.existUser(user.email).subscribe({
        next: (users: User[]) => {
          if (users.length == 0) {
            this._authService.register(user).subscribe({
              next: (res) => {
                this.loadData();
                this.initform();
              },
              error: (err) => {
                console.log(err);
              },
            });
          } else {
            alert('this is email exist!!');
          }
        },
        error: (err) => {
          alert('Error in database');
        },
      });
    } else {
      alert('password diff register password or fields incomplet');
    }
  }

  public saveMember() {
    const valueForm: User = this.memberEditForm.value;
    if (valueForm.id) {
      this.editMember();
    } else {
      this.registerMember();
    }
  }

  public deleteMember(member_id: string) {
    this._memberService.deleteById(member_id).subscribe({
      next: (res) => {
        this.loadData();
      },
      error: (err) => {
        alert('error delete member ');
      },
    });
  }
}
