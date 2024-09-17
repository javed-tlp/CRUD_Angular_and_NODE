import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  httpclient = inject(HttpClient);
  readonly url = "http://localhost:3001/user/";

  constructor(private httpClient: HttpClient) { }

  // Method to handle form data including file uploads
  onsubmit(formData: FormData) {
    return this.httpclient.post(`${this.url}post`, formData);
  }

  getalldetails() {
    return this.httpClient.get(`${this.url}get`);
  }

  ondelete(id: any) {
    return this.httpClient.post(`${this.url}delete/${id}`, { user_id: id });
  }

  getuserbyID(studentID: any) {
    return this.httpClient.get(`${this.url}get/${studentID}`);
  }

  onupdate(updateddata: any, studentID: any) {
    return this.httpclient.put(`${this.url}update/${studentID}`, updateddata);
  }

  // Method to get candidate details by ID
  getCandidateById(id: string) {
    return this.httpclient.get(`${this.url}get/${id}`);
  }

  getCandidateDetails(id: string) {
    return this.httpclient.get(`${this.url}details/${id}`);
  }
}
