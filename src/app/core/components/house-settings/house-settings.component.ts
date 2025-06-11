import { Component } from '@angular/core';
import { HousesService } from '../../services/houses/houses.service';
import { User } from '../../models/interfaces/auth.interface';
import { House } from '../../models/interfaces/house.interface';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-house-settings',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './house-settings.component.html',
  styleUrl: './house-settings.component.css',
})
export class HouseSettingsComponent {
  private user_id: string;
  public housesList!: House[];
  public activateForm!: boolean;
  public activateFormEdit!: boolean;
  public houseForm!: FormGroup;

  constructor(private _houseService: HousesService, private fb: FormBuilder) {
    const userLocal = localStorage.getItem('currentUser');
    const user: User = JSON.parse(userLocal || '');
    this.user_id = user ? user.id : '';
    this.houseForm = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      currency: ['', [Validators.required]],
    });
    this.loadData();
  }

  private loadData() {
    this._houseService.getAllByRepre(this.user_id).subscribe({
      next: (res) => {
        this.housesList = res;
      },
      error: (err) => {
        alert('Failed data list house');
      },
    });
  }

  public initform() {
    this.activateForm = !this.activateForm;
    this.houseForm = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      currency: ['', [Validators.required]],
    });
    this.activateFormEdit = false;
  }

  public editTable(house: House) {
    this.houseForm = this.fb.group({
      id: [house.id],
      name: [house.name, [Validators.required]],
      description: [
        house.description,
        [Validators.required, Validators.maxLength(50)],
      ],
      currency: [house.currency, [Validators.required]],
    });
    this.activateForm = true;
    this.activateFormEdit = true;
  }

  public saveHouse() {
    const valueForm: House = this.houseForm.value;
    if (this.houseForm.valid) {
      if (!valueForm.id) {
        this._houseService
          .createById(
            this.user_id,
            valueForm.name,
            valueForm.description,
            valueForm.currency
          )
          .subscribe({
            next: (res) => {
              this.initform();
              this.loadData();
            },
            error: (err) => {
              alert('error create house');
            },
          });
      } else {
        this._houseService
          .updateById(
            valueForm.id,
            valueForm.name,
            valueForm.description,
            valueForm.currency
          )
          .subscribe({
            next: (res) => {
              this.loadData();
              this.initform();
            },
            error: (err) => {
              alert('error update house ' + valueForm.name);
            },
          });
      }
    } else {
      alert('data not valid');
    }
  }
  public deleteHouse(house_id: string) {
    this._houseService.deleteById(house_id).subscribe({
      next: (res) => {
        this.loadData();
      },
      error: (err) => {
        alert('error delete house ');
      },
    });
  }
}
