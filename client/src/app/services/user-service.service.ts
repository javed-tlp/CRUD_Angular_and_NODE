import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly baseUrl = "http://localhost:3001"; // Base URL for the API
  private readonly userEndpoint = `${this.baseUrl}/user/`; // User-specific endpoints
  private readonly projectEndpoint = `${this.baseUrl}/projects/`; // Project-specific endpoints

  // Inject HttpClient for making HTTP requests
  httpclient = inject(HttpClient);

  constructor() { }

  // User Methods

  // Method to handle form data including file uploads for users
  onsubmit(formData: FormData) {
    return this.httpclient.post(`${this.userEndpoint}post`, formData);
  }

  // Method to delete a user
  ondelete(userId: string) {
    return this.httpclient.post(`${this.userEndpoint}delete/${userId}`, { user_id: userId });
  }

  // Method to get all user details
  getalldetails() {
    return this.httpclient.post(`${this.userEndpoint}get`, {});
  }

  // Method to get a user by ID
  getuserbyID(userId: string) {
    return this.httpclient.post(`${this.userEndpoint}get/${userId}`, {});
  }

  // Method to update user details
  onupdate(updatedData: any, userId: string) {
    return this.httpclient.post(`${this.userEndpoint}update/${userId}`, updatedData);
  }

  // Method to get candidate details by ID
  getCandidateById(candidateId: string) {
    return this.httpclient.post(`${this.userEndpoint}get/${candidateId}`, {});
  }

  // Method to get candidate details
  getCandidateDetails(candidateId: string) {
    return this.httpclient.post(`${this.userEndpoint}details/${candidateId}`, {});
  }

  // Project Methods

  // Method to get the list of projects
  getProjects() {
    return this.httpclient.post(`${this.projectEndpoint}list`, {});
  }

  // Method to get project details by ID
  getProjectsDetails(projectId: string) {
    return this.httpclient.post(`${this.projectEndpoint}get`, { id: projectId });
  }

  // Method to create a new project
  createProject(formData: FormData) {
    return this.httpclient.post(`${this.projectEndpoint}create`, formData);
  }

  // Method to update project details
  updateProject(updatedData: any, projectId: string) {
    return this.httpclient.post(`${this.projectEndpoint}update`, { id: projectId, ...updatedData });
  }

  // Method to delete a project by ID
  deleteProject(projectId: string) {
    return this.httpclient.post(`${this.projectEndpoint}delete`, { id: projectId });
  }
}
