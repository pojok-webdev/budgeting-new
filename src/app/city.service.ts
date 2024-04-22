import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
obj : Observable<any> = new Observable<any>
  constructor(private http:HttpClient,private appvar: AppvarsService) { }
  getCities(callback:any){
    this.obj = this.http.get(this.appvar.server+'/getcities')
    this.obj.subscribe(
      data => {
        console.log("getCities",data)
        callback(data)
      },
      err => {
        console.log("Error",err)
        callback(err)
      }
    )
  }
}
