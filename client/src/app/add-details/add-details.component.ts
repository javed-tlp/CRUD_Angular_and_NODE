import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-details',
  standalone: true,
  imports: [
    HttpClientModule, FormsModule
  ],
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css'] // Fixed the typo (styleUrl to styleUrls)
})
export class AddDetailsComponent {
  Name: string = "";
  Email: string = "";
  Age: number = 0;
  selectedFile: File | null = null; // To hold the selected file

  constructor(
    private userService: UserServiceService,
    public Activatedroute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.Activatedroute.snapshot.params['id']) {
      // Handle any initialization if needed
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onsubmit() {
    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('Name', this.Name);
    formData.append('Email', this.Email);
    formData.append('Age', this.Age.toString());

    // Append the selected file if available
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.userService.onsubmit(formData).subscribe({
      next: (res: any) => {
        this.route.navigateByUrl("get-details");
        console.log("FormData:>>", formData);
        console.log("Response:--", res);
        alert(res.message);
      },
      error: (err: any) => {
        console.log(err, "errors");
      }
    });
  }
}
