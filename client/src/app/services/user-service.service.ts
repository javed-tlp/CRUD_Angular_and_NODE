import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly url = "http://localhost:3001/user/";
  httpclient = inject(HttpClient);

  constructor() { }

  // Method to handle form data including file uploads
  onsubmit(formData: FormData) {
    return this.httpclient.post(`${this.url}post`, formData);
  }

  // Method to delete a user
  ondelete(id: any) {
    return this.httpclient.post(`${this.url}delete/${id}`, { user_id: id });
  }

  // Method to get all user details
  getalldetails() {
    return this.httpclient.post(`${this.url}get`, {});
  }

  // Method to get a user by ID
  getuserbyID(studentID: any) {
    return this.httpclient.post(`${this.url}get/${studentID}`, {});
  }

  // Method to update user details
  onupdate(updatedData: any, studentID: any) {
    return this.httpclient.post(`${this.url}update/${studentID}`, updatedData);
  }

  // Method to get candidate details by ID
  getCandidateById(id: string) {
    return this.httpclient.post(`${this.url}get/${id}`, {});
  }

  // Method to get candidate details
  getCandidateDetails(id: string) {
    return this.httpclient.post(`${this.url}details/${id}`, {});
  }

  // Method to get the list of projects
  getProjects() {
    return this.httpclient.post(`${this.url}projects_list`, {});
  }

  // Method to get project details by ID
  getProjectsDetails(id: string) {
    return this.httpclient.post(`${this.url}projects_details`, { id });
  }
}
