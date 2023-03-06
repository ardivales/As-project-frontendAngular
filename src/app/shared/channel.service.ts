import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseModel} from "../Models/BaseModel";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  baseApiUrl =  "http://18.220.215.21:3000/api/channel/"
  constructor(private http:HttpClient) { }

  getChannels():Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseApiUrl)
  }

}
