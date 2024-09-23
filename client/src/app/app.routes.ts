import { Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { GetDetailsComponent } from './get-details/get-details.component';
import { DetailsComponent } from './details/details.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectsDetailsComponent } from './projects/projects-details/projects-details.component';



export const routes: Routes = [
    // { path: '', redirectTo: 'add-details', pathMatch: 'full' },
    { path: 'add-details', component: AddDetailsComponent },
    
    { path: "edit-details/:id", component: EditDetailsComponent},
    
    { path:"get-details", component: GetDetailsComponent },

    { path: "details/:id", component: DetailsComponent},

    { path: "projects", component: ProjectListComponent},

    { path: "projects-details/:id", component: ProjectsDetailsComponent}
];
