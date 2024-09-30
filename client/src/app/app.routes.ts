import { Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { GetDetailsComponent } from './get-details/get-details.component';
import { DetailsComponent } from './details/details.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectsDetailsComponent } from './projects/projects-details/projects-details.component';
import { AddProjectsComponent } from './projects/add-projects/add-projects.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirect to register on app load
    { path: 'register', component: RegisterComponent }, // Define the registration route
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-details', component: AddDetailsComponent },
    { path: "edit-details/:id", component: EditDetailsComponent },
    { path: "get-details", component: GetDetailsComponent },
    { path: "details/:id", component: DetailsComponent },
    { path: "projects", component: ProjectListComponent },
    { path: "projects-details/:id", component: ProjectsDetailsComponent },
    { path: "add-project", component: AddProjectsComponent }
];
