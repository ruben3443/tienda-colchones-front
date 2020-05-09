import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Users } from '../models/users';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login_data: Login;
  readonly URL = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http: HttpClient) { 
    this.login_data = new Login();
  }

  // login(login: Login){
  //   return this.http.post(this.URL + 'login', login);
  // }

  login(login_object: Login): Observable<Users>{
    return this.http.post<Users>(`${this.URL}/user/login`,
    login_object).pipe(tap(
      (res) => {
        if(res){
          this.saveToken(res.accessToken, res.expiresIn, res.name, res.type);
        }
      })
    );
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_AT");
    localStorage.removeItem("NAME");
    localStorage.removeItem("TYPE");
  }

  private saveToken(token: string, expiresIn: string, name: string, type:number): void{
    var expiresAt = moment().add(expiresIn,'second');
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_AT", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("NAME", name);
    localStorage.setItem("TYPE", type.toString());
    this.token = token;
  }

  public getToken(): string{
    return localStorage.getItem("ACCESS_TOKEN");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isAdmin(){
    const user_type = localStorage.getItem("TYPE");
    if(user_type=="0"){
      return true;
    }else{
      return false;
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem("EXPIRES_AT");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getName(){
    return localStorage.getItem("NAME");
  }
}
