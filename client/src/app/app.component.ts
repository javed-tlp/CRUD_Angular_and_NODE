import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { AddDetailsComponent } from './add-details/add-details.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, AddDetailsComponent, RouterLink, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  home =  HomeComponent
}
