import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-details',
  standalone: true,
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css'],
  imports: [CommonModule]
})
export class ProjectsDetailsComponent implements OnInit {
  project: any;
  projectsDetails: any = {}; // Initialize as an empty object

  constructor(
    private userservice: UserServiceService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Retrieved project ID from route:', id); // Log the retrieved ID
    if (id) {
      this.getProjectsDetails(id);
    } else {
      console.error('No project ID provided in the route.');
    }
  }

  getProjectsDetails(id: string): void {
    console.log('Making API call to fetch project details for ID:', id); // Log the API call
    this.userservice.getProjectsDetails(id).subscribe(
      (response) => {
        console.log('API response received for project details:', response); // Log the API response
        this.project = response;
        this.projectsDetails = this.project.data || {}; // Safely assign data
        console.log("Project Details--->>>", this.projectsDetails); // Log project details
      },
      (error) => {
        console.error('Error fetching project details:', error); // Log any error
      }
    );
  }

  goBack(): void {
    console.log('Navigating back to the projects list.'); // Log navigation action
    this.router.navigate(['/projects']); // Adjust the route as needed
  }
}
