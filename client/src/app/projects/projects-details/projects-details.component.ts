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
  projectsDetails: any[] = [];

  constructor(
    private userservice: UserServiceService,
    private route: ActivatedRoute,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProjectsDetails(id);
    }
  }

  getProjectsDetails(id: string): void {
    this.userservice.getProjectsDetails(id).subscribe(
      (response) => {
        this.project = response;
        this.projectsDetails = this.project.data;
        console.log("Project Details--->>>", this.projectsDetails);
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/projects']); // Adjust the route as needed
  }
}
