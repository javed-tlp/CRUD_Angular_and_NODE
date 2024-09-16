import { Component, OnInit } from '@angular/core';
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

  constructor(private userdetails: UserServiceService) { }

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
    this.userdetails.ondelete(stu_id).subscribe((result) => {
      alert("User deleted successfully");
      this.ngOnInit();
    });
  }

  getuserbyID(stu_id: any) {
    this.userdetails.getuserbyID(stu_id).subscribe((result) => {
      console.log("Response in frontend",result)
      console.log("ID--->",stu_id)
      // Handle user data here
    });
  }
}
