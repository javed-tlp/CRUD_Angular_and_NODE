import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink], // Add CommonModule here
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  candidate: any;

  constructor(
    private userservice: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCandidateDetails(id);
  }

  datata:any
  image:any
  getCandidateDetails(id: string | null) {
    if (id) {
      this.userservice.getCandidateById(id).subscribe((res) => {
        this.candidate = res
        this.datata = this.candidate.data[0]
      });
    } else {
      console.log('No candidate ID provided');
    }
  }

  goBack() {
    this.router.navigate(['/get-details']);
  }

  deleteduser(stu_id: any) {
    this.userservice.ondelete(stu_id).subscribe((result) => {
      this.router.navigateByUrl("/get-details")
      alert("User deleted successfully");
      this.ngOnInit();
    });
  }
}
