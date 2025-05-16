import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from '../../../shared/component/base-form/base-form.component';
import {FormsModule, NgForm} from '@angular/forms';
import {Home} from '../../model/home.entity';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home-create-and-edit',
  imports: [
    FormsModule,
    MatInput,
    MatButton,
    MatFormField
  ],
  templateUrl: './home-create-and-edit.component.html',
  styleUrl: './home-create-and-edit.component.css'
})
export class HomeCreateAndEditComponent extends BaseFormComponent {

  @Input() home!: Home;
  @Input() editMode: boolean = false;
  @Output() protected homeAddRequested = new EventEmitter<Home>();
  @Output() protected homeUpdateRequested = new EventEmitter<Home>();
  @Output() protected cancelRequested = new EventEmitter<void>();

  /** Reference to the home form */
  @ViewChild('homeForm', { static: false }) protected homeForm!: NgForm;

  constructor() {
    super();
    this.home = new Home({});
  }

  protected isValid = (): boolean | null => this.homeForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.homeUpdateRequested : this.homeAddRequested;
      emitter.emit(this.home);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  private resetEditState() {
    this.home = new Home({});
    this.editMode = false;
    this.homeForm.reset();
  }
}
