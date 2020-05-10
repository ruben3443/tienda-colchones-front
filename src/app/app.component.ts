import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  title = 'tienda-colchones';
  isLoged = this.loginService.isLoggedIn(); //To check if user is logged
  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  name = this.loginService.getName(); //To get users name

  /* Method to call logout method in the login service and then redirect to homepage */
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl("/");
  }
}
