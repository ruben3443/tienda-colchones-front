import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  logged = this.loginService.isLoggedIn(); //To check if user is logged
  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  name = this.loginService.getName(); //String to store the user name and use it on the template
  
  /**
   * Login method.
   * It will take the user data (email and password) from the form template and it will send it to the service method.
   * It will redirect to homepage
   * @param form 
   */
  login(form: NgForm){
    this.loginService.login(form.value)
      .subscribe(res => {
        console.log(res);
        
        this.router.navigateByUrl("/");
      });
  }
}
