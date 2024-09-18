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
  studentDetail: any = {};
  studentimage: string | null = null;
  selectedFile: File | null = null; // To hold the selected file

  constructor(
    private route: ActivatedRoute,
    private userser: UserServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.studentID = this.route.snapshot.paramMap.get('id');
    this.userser.getuserbyID(this.studentID).subscribe((res: any) => {
      this.studentDetail = res.data[0];
      this.studentimage = res.data[0].image_path ? `http://localhost:3001/${res.data[0].image_path}` : null;

      // console.log("StudentDetails:---", this.studentDetail);
      // console.log("Studentimage:---", this.studentimage);
    });
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
    }

    this.userser.onupdate(formData, this.studentID).subscribe({
      next: (res: any) => {
        console.log("UpdatedData:---", formData);
        alert(res.message);
        this.router.navigateByUrl('get-details');
      },
      error: (err: any) => {
        console.log(err, "errors");
      }
    });
  }
}
