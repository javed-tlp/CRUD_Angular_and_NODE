import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']  // Use 'styleUrls' instead of 'styleUrl'
})
export class EditDetailsComponent implements OnInit {
  studentID: any;
  studentDetail: any = {};
  studentimage: string | null = null;  // Corrected type to 'string | null'

  constructor(
    private route: ActivatedRoute,
    private userser: UserServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.studentID = this.route.snapshot.paramMap.get('id');
    this.userser.getuserbyID(this.studentID).subscribe((res: any) => {
      this.studentDetail = res.data[0];
  
      // Check if the image_path is available and construct the image URL accordingly
      this.studentimage = res.data[0].image_path ? `http://localhost:3001/${res.data[0].image_path}` : null;
  
      console.log("StudentDetails:---", this.studentDetail);
      console.log("Studentimage:---", this.studentimage);
    });
  }
  

  onupdate() {
    const updateddata = {
      "Name": this.studentDetail.Name,
      "Email": this.studentDetail.Email,
      "Age": this.studentDetail.Age
    };
    this.userser.onupdate(updateddata, this.studentID).subscribe({
      next: (res: any) => {
        console.log("UpdatedData:---", updateddata);
        alert(res.message);
        this.router.navigateByUrl('get-details');
      },
    });
  }
}
