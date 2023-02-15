import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseModel} from "../Models/BaseModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseApiUrl =  "http://localhost:9000/api/user/"

  getUsers():Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseApiUrl)
  }

  getUsersById(id:any):Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseApiUrl+id)
  }

  deleteUsersById(id:any){
    return this.http.delete<BaseModel>(this.baseApiUrl+id)
  }

  createUser(userData:any){
    return this.http.post(this.baseApiUrl, userData)
  }

  updateUser(id:any, userData:any){
    return this.http.put(this.baseApiUrl+id, userData)
  }
}
