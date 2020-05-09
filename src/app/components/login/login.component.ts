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

  logged = this.loginService.isLoggedIn();
  isAdmin = this.loginService.isAdmin();
  
  login(form: NgForm){
    this.loginService.login(form.value)
      .subscribe(res => {
        console.log(res);
        
        // window.location.reload();
        this.router.navigateByUrl("/");
      });
  }

  name = this.loginService.getName();
}
