import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css']
})
export class GetDetailsComponent implements OnInit {

  studentData: any = [];
  data: any = [];
  filteredData: any = [];
  searchQueryId: string = '';
  searchQueryName: string = '';
  searchQueryEmail: string = '';

  constructor(
    private userdetails: UserServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userdetails.getalldetails().subscribe((fetchedData) => {
      this.studentData = fetchedData;
      this.assignData();
    });
  }

  assignData() {
    this.data = this.studentData.data;
    this.filteredData = this.data; // Initialize filteredData with all data
  }

  onSearch() {
    this.filteredData = this.data.filter((student: any) =>
      (student.id.toString().includes(this.searchQueryId) || this.searchQueryId === '') &&
      (student.Name.toLowerCase().includes(this.searchQueryName.toLowerCase()) || this.searchQueryName === '') &&
      (student.Email.toLowerCase().includes(this.searchQueryEmail.toLowerCase()) || this.searchQueryEmail === '')
    );
  }

  ondelete(stu_id: any) {
    // Call the delete service and navigate back to get-details on success
    this.userdetails.ondelete(stu_id).subscribe(
      () => {
        // alert("User deleted successfully");
        this.router.navigate(['/get-details']); // Redirect to get-details page
      },
      (error) => {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user."); // Optionally handle error
      }
    );
  }

  getCandidateDetails(id: any) {
    this.userdetails.getCandidateDetails(id).subscribe((result) => {
      console.log("Response:", result);
      // Navigate to the details page
      this.router.navigate(['/details', id]);
    });
  }
}
