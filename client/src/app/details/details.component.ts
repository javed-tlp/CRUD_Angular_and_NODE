import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  candidate: any;
  datata: any;

  constructor(
    private userservice: UserServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCandidateDetails(id);
  }

  getCandidateDetails(id: string | null) {
    if (id) {
      this.userservice.getCandidateById(id).subscribe(
        (res) => {
          this.candidate = res;
          this.datata = this.candidate.data; // Assuming `data` is the correct property
        },
        (error) => {
          // Handle error if needed
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/get-details']);
  }

  deleteduser(stu_id: any) {
    this.userservice.ondelete(stu_id).subscribe(
      () => {
        alert("User deleted successfully");
        this.router.navigateByUrl("/get-details"); // Redirect to get-details page
      },
      (error) => {
        // Handle error if needed
      }
    );
  }
}
