import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.loginService.login(form.value)
      .subscribe(res => {
        console.log(res);
      });
  }
}
