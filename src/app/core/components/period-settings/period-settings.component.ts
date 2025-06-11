import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Period } from '../../models/interfaces/period.interface';
import { PeriodsService } from '../../services/periods/periods.service';
import { User } from '../../models/interfaces/auth.interface';
import { HousesService } from '../../services/houses/houses.service';
import { House } from '../../models/interfaces/house.interface';

@Component({
  selector: 'app-period-settings',
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './period-settings.component.html',
  styleUrl: './period-settings.component.css',
})
export class PeriodSettingsComponent {
  private user_id: string;
  public periodsList!: Period[];
  public activateForm!: boolean;
  public activateFormEdit!: boolean;
  public periodForm!: FormGroup;
  public houseList!: House[];

  constructor(
    private _periodService: PeriodsService,
    private fb: FormBuilder,
    private _houseService: HousesService
  ) {
    const userLocal = localStorage.getItem('currentUser');
    const user: User = JSON.parse(userLocal || '');
    this.user_id = user ? user.id : '';
    this.periodForm = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      dateInit: ['', [Validators.required]],
      dateDue: ['', [Validators.required]],
      house_id: ['', [Validators.required]],
    });
    this.loadData();
  }

  private loadData() {
    this._periodService.getAllByRepre(this.user_id).subscribe({
      next: (res) => {
        this.periodsList = res;

        this._houseService.getAllByRepre(this.user_id).subscribe({
          next: (res: House[]) => {
            this.houseList = res;

            this.periodsList = this.periodsList.map((x: Period) => {
              const house: House =
                this.houseList.find((h) => h.id == x.house_id) || ({} as House);
              return {
                id: x.id,
                name: x.name,
                dateInit: x.dateInit,
                dateDue: x.dateDue,
                owner_id: x.owner_id,
                house_id: x.house_id,
                house_name: house.name ?? 'undefined',
              };
            });
          },
          error: (err) => {
            alert('Failed data list House');
          },
        });
      },
      error: (err) => {
        alert('Failed data list period');
      },
    });
  }

  public initform() {
    this.activateForm = !this.activateForm;
    this.periodForm = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      dateInit: ['', [Validators.required]],
      dateDue: ['', [Validators.required]],
      house_id: ['', [Validators.required]],
    });
    this.activateFormEdit = false;
  }

  public editTable(period: Period) {
    this.periodForm = this.fb.group({
      id: [period.id],
      name: [period.name, [Validators.required]],
      dateInit: [period.dateInit, [Validators.required]],
      dateDue: [period.dateDue, [Validators.required]],
      house_id: [period.house_id, [Validators.required]],
    });
    this.activateForm = true;
    this.activateFormEdit = true;
  }

  public savePeriod() {
    const valueForm: Period = this.periodForm.value;
    if (this.periodForm.valid) {
      if (!valueForm.id) {
        this._periodService
          .createById(
            this.user_id,
            valueForm.name,
            valueForm.dateInit,
            valueForm.dateDue,
            valueForm.house_id
          )
          .subscribe({
            next: (res) => {
              this.loadData();
              this.initform();
            },
            error: (err) => {
              alert('error create period');
            },
          });
      } else {
        this._periodService
          .updateById(
            valueForm.id,
            valueForm.name,
            valueForm.dateInit,
            valueForm.dateDue,
            valueForm.house_id
          )
          .subscribe({
            next: (res) => {
              this.loadData();
              this.initform();
            },
            error: (err) => {
              alert('error update period ' + valueForm.name);
            },
          });
      }
    } else {
      alert('data not valid');
    }
  }
  public deletePeriod(period_id: string) {
    this._periodService.deleteById(period_id).subscribe({
      next: (res) => {
        this.loadData();
      },
      error: (err) => {
        alert('error delete period ');
      },
    });
  }
}
