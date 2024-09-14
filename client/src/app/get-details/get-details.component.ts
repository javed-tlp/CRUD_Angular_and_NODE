import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
// import { AddDetailsComponent } from '../add-details/add-details.component';

@Component({
  selector: 'app-get-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-details.component.html',
  styleUrl: './get-details.component.css'
})
export class GetDetailsComponent implements OnInit {

  constructor(private userdetails: UserServiceService) { }
  studentData: any = []
  data: any = []


  ngOnInit(): void {
    this.userdetails.getalldetails().subscribe((fetchedData) => {
      this.studentData = fetchedData;
      console.log("studentdata", this.studentData)
      console.log("fe", fetchedData)
      this.assignData()
    })

  }
  assignData() {
    this.data = this.studentData.data
    console.log("data",this.data)
  }

  ondelete(stu_id: any) {
    this.userdetails.ondelete(stu_id).subscribe((result) => {
      console.log("result:-", result)
      alert("User deleted successfully")
      this.ngOnInit()
    })

    // console.log(stu_id)
  }
  getuserbyID(stu_id: any) {
    this.userdetails.getuserbyID(stu_id).subscribe((result) => {
      // console.log("User-Data:-", result)
      
      
    })
  }


}
