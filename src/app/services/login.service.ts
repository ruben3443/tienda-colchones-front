import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login_data: Login;
  readonly URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { 
    this.login_data = new Login();
  }

  login(login: Login){
    return this.http.post(this.URL + 'login', login);
  }
}
