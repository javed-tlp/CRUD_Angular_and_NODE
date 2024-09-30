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

  // USER METHODS

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

  // Method to register a new user
  register(userData: any) {
    return this.httpclient.post(`${this.userEndpoint}register`, userData);
  }

  // Method to login a user
  login(credentials: { Email: string; password: string }) {
    console.log('Sending login request with:', credentials); // Log the credentials

    return this.httpclient.post(`${this.userEndpoint}login`, credentials);
  }

  // PROJECT METHODS

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
    // Sending form data including file uploads to the server
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

  // Method to logout a user
  logout() {
    // Implementation of logout logic, such as clearing tokens from local storage or making a logout API call
    localStorage.removeItem('token'); // Clear the JWT token from local storage
    return { message: 'Logged out successfully' }; // This can be adjusted based on your logout API response
  }
}
