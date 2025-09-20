import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

type UserRoleType = (typeof USER_ROLES)[number]['value'];

const USER_ROLES = [
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'teacher',
    label: 'Teacher',
  },
  {
    value: 'employee',
    label: 'Employee',
  },
  {
    value: 'founder',
    label: 'Founder',
  },
  {
    value: 'other',
    label: 'Other',
  },
] as const;

function validateEqualValues(...controls: string[]): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl) => {
    const inputValues: string[] = controls.map(n => String(control.get(n)?.value));
    let tempIndex = 0;

    for (let index = 1; index < inputValues.length; index++) {
      if (inputValues[tempIndex] !== inputValues[index]) return { valuesNotEqual: true };
      tempIndex = index;
    }

    return null;
  }
}

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styleUrl: './signUp.component.css',
  imports: [ReactiveFormsModule],
})
export class SignUpComponent {
  roles = USER_ROLES;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    role: new FormControl<UserRoleType>(USER_ROLES[0].value, [
      Validators.required,
    ]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl<boolean>(false, [Validators.requiredTrue]),
  }, {
    validators: [validateEqualValues('password', 'confirmPassword')]
  });

  get isInvalidEmail() {
    if (
      this.form.controls['email'].dirty &&
      this.form.controls['email'].errors?.['email']
    ) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  get emailInput() {
    return this.form.controls['email'];
  }

  get passwordInput() {
    return this.form.controls['password'];
  }

  get confirmPasswordInput() {
    return this.form.controls['confirmPassword'];
  }

  handleSubmit() {
    // if (!this.form.valid) return;

    alert('form submitted'); 
    console.log(this.form);
  }

  handleReset() {
    const result = confirm('Are you sure you want to reset the form?');
    if (result) this.form.reset();
  }
}
