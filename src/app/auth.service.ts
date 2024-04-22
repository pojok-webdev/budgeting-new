import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth : Observable<any> = new Observable<any>
  token:any
  constructor(private http : HttpClient,private appvar:AppvarsService) { }
  login(obj:any,callback:any){
    this.auth = this.http.post<any>(this.appvar.server+'/login',obj)
    this.auth.subscribe(
      data => {
        switch(data.message){
          case 'auth error':
            callback(false,data,'auth error')
          break
          default:
            localStorage.setItem("token",data.token)
            localStorage.setItem("email",data.email)
            localStorage.setItem('level',data.level)
            localStorage.setItem('username',data.username)
            localStorage.setItem('id',data.id)
            callback(true,data,'ok')
          break
        }
      },
      err => {
        callback(false,err,'server error')
      }
    )
  }
  logout(){
    localStorage.removeItem("token")
    window.location.href = "/login"
  }
  isLogin(callback:any){
    this.token = localStorage.getItem("token")
    this.auth = this.http.get<any>(this.appvar.server+'/islogin/'+this.token)
    this.auth.subscribe(
      data => {
        callback(data,localStorage.getItem('email'))
      },
      err => {
        callback(err,null)
      }
    )
  }
  updatePassword(obj:any,callback:any){
    this.auth = this.http.post<any>(this.appvar.server+'/updatepassword',obj)
    this.auth.subscribe(
      data => {
        console.log("Data",data)
      },
      err => {
        console.log("Err",err)
      }
    )
  }
  getUser(obj:any, callback:any){
    this.auth = this.http.post<any>(this.appvar.server+'/login',obj)
    this.auth.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  isMemberOf(obj:any,callback:any){
    this.auth = this.http.post<any>(this.appvar.server+'/ismemberof',obj)
    this.auth.subscribe(
      data => {
        console.log("isMemberOf Params",obj,'Data',data)
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  isMemberOfClass(obj:any,callback:any){
    this.auth = this.http.post<any>(this.appvar.server+'/ismemberofclass',obj)
    this.auth.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  isMemberOfDivision(obj:any,callback:any){
    this.auth = this.http.get(this.appvar.server+'/ismemberofdivision/'+obj.user_id+'/'+obj.division_id)
    this.auth.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  checkIfUserCanApprove(totalPricee:any,userid:any,callback:any){
    this.checkauth(this.authcheck(totalPricee),userid,(result:any)=>{
      console.log("B")
      callback(result)
    })
  }
  authcheck(num:any){
    console.log("Num of submission",num)
    if(num<=2500000){
      return [2,3,4,5,6]
    }else if(num<=5000000){
      return [3,4,5,6]
    }else if(num<50000000){
      return [4,5,6]
    }else{
      return [5,6]
    }
  }
  checkauth(num:any,userid:any,callback:any){
    num.forEach((element:any) => {
      this.isMemberOf({role_id:element,user_id:userid},(result:any)=>{          
        if(result.length>0){
          console.log("AAA")
          callback(true)
        }
      })
    });
    return false
  }

}
