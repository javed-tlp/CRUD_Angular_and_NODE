import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    // Initialize the registration form without validation
    this.registerForm = this.formBuilder.group({
      Name: [''],
      Email: [''],
      Age: [''],
      password: ['']
    });
  }

  // Method to handle form submission
  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Navigate to the login page or show a success message
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration error (e.g., show error message)
      }
    );
  }
}
