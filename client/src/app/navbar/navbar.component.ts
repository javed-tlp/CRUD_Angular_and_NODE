import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddDetailsComponent } from '../add-details/add-details.component';
import { GetDetailsComponent } from '../get-details/get-details.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AddDetailsComponent, GetDetailsComponent, RouterLink, RouterOutlet, HttpClientModule, FormsModule, DetailsComponent],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
