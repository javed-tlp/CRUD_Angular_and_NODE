import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  httpclient = inject(HttpClient)
  readonly url = "http://localhost:3001/user/"
  constructor(private httpClient: HttpClient) { }


  onsubmit(inputData: object) {
    return this.httpclient.post(`http://localhost:3001/user/post`, inputData)
  }

  getalldetails() {
    return this.httpClient.get('http://localhost:3001/user/get')
  }

  ondelete(id: any) {
    return this.httpClient.post(`${"http://localhost:3001/user/delete"}/${id}`,{user_id:id})
  }
  getuserbyID(studentID:any) {
    return this.httpClient.get(`http://localhost:3001/user/get/${studentID}`)
  }

  onupdate(updateddata: any, studentID:any) {
    return this.httpclient.put(`http://localhost:3001/user/update/${studentID}`, updateddata)
  }


}

