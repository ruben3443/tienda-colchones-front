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
          this.saveToken(res.accessToken, res.expiresIn, res.name);
        }
      })
    );
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACESS_TOKEN");
    localStorage.removeItem("EXPIRES_AT");
    localStorage.removeItem("NAME");
  }

  private saveToken(token: string, expiresIn: string, name: string): void{
    var expiresAt = moment().add(expiresIn,'second');
    localStorage.setItem("ACESS_TOKEN", token);
    localStorage.setItem("EXPIRES_AT", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("NAME", name);
    this.token = token;
  }

  private getToken(): string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
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
