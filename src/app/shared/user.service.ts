import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseModel} from "../Models/BaseModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseApiUrl =  "http://18.220.215.21:3000/api/user/"
  baseApiUrl_local =  "http://localhost:3000/api/user/"

  getUsers():Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseApiUrl)
  }

  getUsersById(id:any):Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseApiUrl+id)
  }

  deleteUsersById(id:any){
    return this.http.delete<BaseModel>(this.baseApiUrl+id)
  }

  createUser(userData:any):Observable<BaseModel>{
    return this.http.post<BaseModel>(this.baseApiUrl_local, userData)
  }

  updateUser(id:any, userData:any):Observable<BaseModel>{
    return this.http.put<BaseModel>(this.baseApiUrl+id, userData)
  }
}
