import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router'; // Change from 'express' to '@angular/router'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private userService: UserServiceService,
    private router: Router // Update to use Angular Router
  ) {}

  user = {
    name: 'Javed Saifi',
    email: 'saifijaved616@gmail.com',
    role: 'Admin',
    lastLogin: '2024-09-30',
    phone: '8527019853',
    address: '123 Main St, City, Country',
    profilePicture: 'path_to_profile_picture.jpg',
  };

  activities = [
    { title: 'Project Submission', date: '2024-09-28', status: 'Completed' },
    { title: 'Profile Update', date: '2024-09-25', status: 'Pending' },
    { title: 'Password Change', date: '2024-09-20', status: 'Completed' },
  ];

  notifications = [
    { message: 'Your password will expire in 3 days.', date: '2024-09-28' },
    { message: 'New project assignments have been added.', date: '2024-09-27' },
    { message: 'Profile updated successfully.', date: '2024-09-26' },
  ];

  upcomingTasks = [
    { task: 'Complete Angular tutorial', dueDate: '2024-10-05' },
    { task: 'Prepare presentation for the meeting', dueDate: '2024-10-01' },
    { task: 'Finish the report by the end of the week', dueDate: '2024-10-03' },
  ];

  // Logout method
  logout() {
    const resp = this.userService.logout(); // Call the logout method
    console.log(resp.message); // Log the message

    // Navigate to the login page (update with your actual login route)
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
