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
  ) {
    console.log('DetailsComponent constructor called');
  }

  ngOnInit(): void {
    console.log('DetailsComponent ngOnInit called');

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Candidate ID from URL:', id);

    this.getCandidateDetails(id);
  }
  datata:any
  image:any
  getCandidateDetails(id: string | null) {
    if (id) {
      console.log('Fetching candidate details for ID:', id);
      this.userservice.getCandidateById(id).subscribe((res) => {
        this.candidate = res
        this.datata = this.candidate.data[0]
        // this.image = this.candidate.data[0].image_path

        console.log("datatatata",this.image)
        console.log('Response--->:', res);
        console.log('Candidate data fetched:', this.candidate);
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
