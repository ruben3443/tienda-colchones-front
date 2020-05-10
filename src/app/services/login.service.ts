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

  constructor(private http: HttpClient) { 
    this.login_data = new Login();
  }

  login_data: Login; //Object to store the sent login data to the server
  readonly URL = 'http://localhost:3000'; //URL base to this module
  authSubject = new BehaviorSubject(false);
  private token: string; //String to store user token

  /**
   * Method to user log with HTTP POST request. Email and password will be sent
   * If identification is successful it will call saveToken() method to store the response data
   * @param login_object 
   */
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

  /**
   * Method to logout user. It will remove all stored user data from the browser
   */
  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_AT");
    localStorage.removeItem("NAME");
    localStorage.removeItem("TYPE");
  }

  /**
   * Method to save user data in the browser. It will store all received params
   * @param token 
   * @param expiresIn 
   * @param name 
   * @param type 
   */
  private saveToken(token: string, expiresIn: string, name: string, type:number): void{
    var expiresAt = moment().add(expiresIn,'second');
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_AT", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("NAME", name);
    localStorage.setItem("TYPE", type.toString());
    this.token = token;
  }

  /**
   * Method to get token to make it accessible from other modules
   */
  public getToken(): string{
    return localStorage.getItem("ACCESS_TOKEN");
  }

  /**
   * Method to check if user is logged. It will compare the expiration timestamp stored on the browser with the actual timestamp (with moment module)
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Method to check if user is admin
   */
  public isAdmin(){
    const user_type = localStorage.getItem("TYPE");
    if(user_type=="0"){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Method to get expiration time (stored timestamp in the browser) of user token
   */
  getExpiration() {
    const expiration = localStorage.getItem("EXPIRES_AT");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * Method to get users name (stored string in th brower)
   */
  getName(){
    return localStorage.getItem("NAME");
  }
}
