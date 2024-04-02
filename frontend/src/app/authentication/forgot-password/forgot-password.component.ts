/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  // Define properties for form controls
  email: any;
  emailCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this.formBuilder.group({
      emailCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  getEmailErrorMessage(): string {
    const emailControl = this.firstFormGroup.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    return emailControl?.hasError('email') ? 'Not a valid email' : '';
  }

  getEmailCodeErrorMessage(): string {
    const emailCodeControl = this.secondFormGroup.get('emailCode');
    if (emailCodeControl?.hasError('required')) {
      return 'Email Code is required';
    }
    return emailCodeControl?.hasError('pattern') ? 'Email Code must be six digits long' : '';
  }

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const email = this.firstFormGroup.get('email')?.value;
      const emailCode = this.secondFormGroup.get('emailCode')?.value;
      const newPassword = ''; // You need to get the new password from the user
      
      this.authService.resetPassword(email, emailCode, newPassword).subscribe(
        (response) => {
          // Handle success
          console.log('Password reset successful');
          // Redirect or show success message
        },
        (error) => {
          // Handle error
          console.error('Error resetting password:', error);
          // Show error message
        }
      );
    }
  }
}

*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

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
emailSent: any;

  constructor(private router: Router ,private fb: FormBuilder,private AuthService:AuthService) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this.fb.group({
      emailCode: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.thirdFormGroup = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
       // Validators.pattern(/\d/),
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
  
  getEmailCodeErrorMessage() {
    const emailCodeControl = this.emailCode;
    if (emailCodeControl) {
      return emailCodeControl.hasError('required') ? 'email Code is required' :
             emailCodeControl.hasError('minlength') ? 'email Code must be six digits long' :
             '';
    }
    return '';
  }
  
  get username() { return this.firstFormGroup.get('username'); }
  get email() { return this.firstFormGroup.get('email'); 
}
  get emailCode() { return this.secondFormGroup.get('emailCode'); }
  get password() { return this.thirdFormGroup.get('password'); }

onSubmitEmail() {
  console.log('onSubmitEmail function called');
  
  if (this.firstFormGroup.valid) {
    console.log('Form is valid');

    const email = this.firstFormGroup.get('email')?.value;
    console.log('Email:', email);
    
    const observer: Observer<any> = {
      next: (response) => {
        console.log('Password reset email sent successfully');
        this.emailSent = true;
      },
      error: (error) => {
        console.error('Error sending password reset email:', error);
        // Show an error message to the user
      },
      complete: () => {
        // Optional: Handle completion if needed
      }
    };

    console.log('Calling AuthService.requestPasswordReset');
    this.AuthService.requestPasswordReset(email).subscribe(observer);
  } else {
    console.log('Form is invalid');
  }
}

onSubmitCodeAndNewPassword() {
  console.log('onSubmitCodeAndNewPassword function called');
  
  if (this.secondFormGroup.valid && this.thirdFormGroup.valid) {
    console.log('Form is valid');

    const email = this.firstFormGroup.get('email')?.value;
    const emailCode = this.secondFormGroup.get('emailCode')?.value;
    const newPassword = this.thirdFormGroup.get('password')?.value;
    
    console.log('Email:', email);
    console.log('Email Code:', emailCode);
    console.log('New Password:', newPassword);
    
    this.AuthService.resetPassword(email, emailCode, newPassword).subscribe(
      (response) => {
        console.log('Password reset successful');
        // Proceed to the next step or show a success message
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Error resetting password:', error);
        // Show an error message to the user
      }
    );
  } else {
    console.log('Form is invalid');
  }
}



}



