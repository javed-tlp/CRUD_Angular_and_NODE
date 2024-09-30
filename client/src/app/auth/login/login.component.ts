import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    // Initialize the login form with validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email must be valid and required
      password: ['', [Validators.required]] // Password must be required
    });
  }

  onSubmit() {
    console.log('Form data before submission:', this.loginForm.value); // Log the form data
    console.log('Email:', this.loginForm.get('email')?.value); // Log email
    console.log('Password:', this.loginForm.get('password')?.value); // Log password

    // Check if the form is valid
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful:', response); // Log the successful response
          // Redirect to the desired page after successful login
          this.router.navigate(['/dashboard']); // Change '/home' to your desired route
        },
        (error) => {
          console.error('Login failed:', error); // Log the error response
          alert('Login failed: ' + (error.error.message || 'Unknown error occurred')); // Show an error message
        }
      );
    } else {
      console.warn('Form is invalid. Please check the input fields.'); // Log a warning if the form is invalid
    }
  }
}
