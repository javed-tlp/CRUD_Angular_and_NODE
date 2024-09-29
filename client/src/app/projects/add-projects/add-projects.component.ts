import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-add-projects',
  standalone: true,
  imports: [
    HttpClientModule, FormsModule
  ],
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent {
  title: string = "";  // Project title
  description: string = "";  // Project description
  frontendTech: string = "";  // Frontend technologies
  backendTech: string = "";  // Backend technologies
  databaseTech: string = "";  // Database technologies
  selectedFile: File | null = null;  // To hold the selected file (image)

  constructor(
    private users: UserServiceService,

    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      // Handle project update or load existing project details
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('frontendTech', this.frontendTech);
    formData.append('backendTech', this.backendTech);
    formData.append('databaseTech', this.databaseTech);

    // Append the selected file if available
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.users.createProject(formData).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl("projects");
        console.log("FormData:>>", formData);
        console.log("Response:--", res);
        alert(res.message);
      },
      error: (err: any) => {
        console.log("Error:", err);
      }
    });
  }
}
