import { Component } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.username, this.email, this.password);
  }
}
