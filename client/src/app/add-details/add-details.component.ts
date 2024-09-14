import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, RouterLink, RouterOutlet, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-details',
  standalone: true,
  imports: [
    RouterOutlet, HttpClientModule, FormsModule, RouterLink
  ],
  templateUrl: './add-details.component.html',
  styleUrl: './add-details.component.css'
})
export class AddDetailsComponent {
  newdata: any = []
  constructor(
    private userService: UserServiceService,
    public Activatedroute: ActivatedRoute,
    private route:Router
  ) { }
  Name: string = "";
  Email: string = "";
  Age: number = 0;

  ngOnInit(): void {
    if (this.Activatedroute.snapshot.params['id']) {
      console.log("--->");
      // this.getuserbyID(stu_id)
    }
  }
  getuserbyID(stu_id: any) {
    this.userService.getuserbyID(stu_id).subscribe((result) => {
      console.log("User-Data:-", result)
    })
  }
  onsubmit() {
    var inputData = {
      Name: this.Name,
      Email: this.Email,
      Age: this.Age
    }
    this.userService.onsubmit(inputData).subscribe({
      next: (res: any) => 
      {
        this.route.navigateByUrl("get-details")
        console.log("inputData:>>", inputData) 
        console.log("response:--", res)
        alert(res.message)
      },
      error: (err: any) => {
        console.log(err, "errors")
      }
    });
  }

}