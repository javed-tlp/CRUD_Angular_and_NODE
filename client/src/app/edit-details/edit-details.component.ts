import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  studentID: any;
  studentDetail: any = {};  // Initialize studentDetail as an empty object
  studentimage: string | null = null;
  selectedFile: File | null = null; // To hold the selected file

  constructor(
    private route: ActivatedRoute,
    private userser: UserServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Get the ID from the route and fetch the student details
    this.studentID = this.route.snapshot.paramMap.get('id');
    console.log("Fetched studentID from URL:", this.studentID);

    if (this.studentID) {
      this.userser.getuserbyID(this.studentID).subscribe((res: any) => {
        console.log("Response from backend:", res);

        // Check if data exists and is an object
        if (res && res.data) {
          this.studentDetail = res.data;  // Directly assign the object to studentDetail
          this.studentimage = res.data.image_path
            ? `http://localhost:3001/${res.data.image_path}` // Correcting the image URL formation
            : null;

          console.log("Student detail data filled in form:", this.studentDetail);
          console.log("Image URL:", this.studentimage);
        } else {
          console.error("No data found for the provided studentID");
        }
      }, (error) => {
        console.error("Error fetching student data:", error);
      });
    } else {
      console.error("studentID is null or undefined");
    }
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Selected file:", this.selectedFile);
  }

  // Handle update form submission
  onupdate() {
    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('Name', this.studentDetail.Name);
    formData.append('Email', this.studentDetail.Email);
    formData.append('Age', this.studentDetail.Age.toString());

    // Append the selected file if available
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    } else {
      // If no new file is selected, send the existing image path to keep it
      formData.append('existingImage', this.studentDetail.image_path);

    }

    console.log("Form data being sent to backend:", formData);

    this.userser.onupdate(formData, this.studentID).subscribe({
      next: (res: any) => {
        console.log("Update response:", res);
        alert(res.message);
        this.router.navigateByUrl('get-details'); // Navigate back to details page after update
      },
      error: (err: any) => {
        console.error("Error during update:", err);
      }
    });
  }
}
