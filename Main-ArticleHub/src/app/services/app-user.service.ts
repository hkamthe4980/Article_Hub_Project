import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
   url = environment.apiUrl
  constructor(private httpClient :HttpClient) { }
  login(data:any){
    return this.httpClient.post(this.url+
      "/appuser/login",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
  addNewAppUser(data:any){
    return this.httpClient.post(this.url+
      "/appuser/addNewAppUser",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
  getAllAppUser(){
    return this.httpClient.get(this.url + "/appUser/getAllAppUser");
  }

  updateUser(data:any){
    return this.httpClient.post(this.url+
      "/appuser/updateUser",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
  updateUserStatus(data:any){
    console.log('Api request data',data);
    return this.httpClient.post(this.url+
      "/appuser/updateUserStatus",data,{
        headers:new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
  
}
