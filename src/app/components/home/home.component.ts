import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [LoginService, HomeService]
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService,  private loginService: LoginService) { }

  ngOnInit() {
    this.getProducts();
  }

  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  logged = this.loginService.isLoggedIn(); //To check if user is logged

  p: number = 1; //Initial page for the pagination service
  itemsPerPage: number = 6; //Items per page for the pagination service

  /**
   * Method to get all the important products.
   * It will call the service methos to get them
   */
  getProducts(){
    this.homeService.getProducts()
      .subscribe(res => {
        this.homeService.products = res as Products[];
      });
    }
}
