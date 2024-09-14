import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.css'
})
export class EditDetailsComponent implements OnInit {


  
  studentID: any;
  studentDetail: any = {}


  constructor(
    private route: ActivatedRoute,
    private userser: UserServiceService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.studentID = this.route.snapshot.paramMap.get('id')
    this.userser.getuserbyID(this.studentID).subscribe((res: any) => {
      this.studentDetail = res.data[0]
      console.log("StudentDetails:---", this.studentDetail)
    })
  }
  onupdate() {
    var updateddata = {
      "Name": this.studentDetail.Name,
      "Email": this.studentDetail.Email,
      "Age": this.studentDetail.Age
    }
    this.userser.onupdate(updateddata, this.studentID).subscribe({
      next: (res: any) => {
        console.log("UpdatedData:---", updateddata)
        alert(res.message)
        this.router.navigateByUrl('get-details')
      },
    })



  }


}
