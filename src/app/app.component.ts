import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'tienda-colchones';

  ngOnInit() {
  }

  constructor(private loginService: LoginService, private router: Router) { }

  isLoged = this.loginService.isLoggedIn();
  name = this.loginService.getName();

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl("/");
  }
}
