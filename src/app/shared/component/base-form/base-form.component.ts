import {FormGroup} from "@angular/forms";

/**
 * Base class for form components
 * @class BaseFormComponent
 * @description
 * This class provides common functionality for form components.
 * It provides methods to check if a control is invalid and to get the error messages for a control.
 * @remarks
 * It is intended to be extended by other form components.
 *
 */
export class BaseFormComponent {

  /**
   * Check if a control is invalid
   * @param form The form
   * @param controlName The control name
   * @returns True if the control is invalid, false otherwise
   * @protected
   */
  protected isInvalidControl(form: FormGroup, controlName: string) {
    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

  /**
   * Get the error messages for a control
   * @param form The form
   * @param controlName The control name
   * @returns The error messages
   * @protected
   */
  protected errorMessagesForControl(form: FormGroup, controlName: string) {
    const control = form.controls[controlName];
    let errorMessages = "";
    let errors = control.errors;
    if (!errors) return errorMessages;
    Object.keys(errors).forEach((errorKey) => errorMessages += this.errorMessageForControl(controlName, errorKey));
    return errorMessages;
  }

  /**
   * Get the error message for a control
   * @param controlName The control name
   * @param errorKey The error key
   * @returns The error message
   * @private
   */
  private errorMessageForControl(controlName: string, errorKey: string) {
    switch (errorKey) {
      case 'required':
        return `The field ${controlName} is required`;
      default:
        return `The field ${controlName}is invalid`;
    }
  }

}
