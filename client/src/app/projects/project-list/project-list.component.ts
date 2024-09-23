import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { UserServiceService } from '../../services/user-service.service';  // Adjust the path if needed
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],  // Add CommonModule to imports
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];  // To store the list of projects

  constructor(private userservice: UserServiceService) {}

  ngOnInit() {
    // Fetch the projects when the component initializes
    this.userservice.getProjects().subscribe(
      (data: any) => {
        this.projects = data.data;  // Assign the data to the projects array
        console.log("Projects-->>",this.projects)
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }
}
