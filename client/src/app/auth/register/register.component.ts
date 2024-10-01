import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    // Initialize the registration form with validation
    this.registerForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Name is required and minimum 3 characters
      Email: ['', [Validators.required, Validators.email]], // Email must be valid and required
      Age: ['', [Validators.required, Validators.min(18)]], // Age is required and minimum 18
      password: ['', [Validators.required, Validators.minLength(6)]] // Password is required and minimum 6 characters
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Show success message
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          // Navigate to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          // Optionally show error message
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  // Method to check if a field is invalid
  isFieldInvalid(field: string) {
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }
}
