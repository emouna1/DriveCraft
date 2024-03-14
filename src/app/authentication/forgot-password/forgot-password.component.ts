import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this.fb.group({
      smsCode: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.thirdFormGroup = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/\d/),
        Validators.pattern(/[A-Za-z]/),
        /* Other validators here */]
      ]
    });
  }

  getEmailErrorMessage() {
    const emailControl = this.email;
    if (emailControl) {
      return emailControl.hasError('required') ? 'Email is required' :
             emailControl.hasError('email') ? 'Not a valid email' :
             '';
    }
    return '';
  }
  
  getSmsCodeErrorMessage() {
    const smsCodeControl = this.smsCode;
    if (smsCodeControl) {
      return smsCodeControl.hasError('required') ? 'SMS Code is required' :
             smsCodeControl.hasError('minlength') ? 'SMS Code must be six digits long' :
             '';
    }
    return '';
  }
  
  get username() { return this.firstFormGroup.get('username'); }
  get email() { return this.firstFormGroup.get('email'); }
  get smsCode() { return this.secondFormGroup.get('smsCode'); }
  get password() { return this.thirdFormGroup.get('password'); }
}
