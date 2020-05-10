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
  isAdmin = this.loginService.isAdmin();
  logged = this.loginService.isLoggedIn();

  // page = 1;
  // collectionSize = 0;
  // pageSize = 2;
  p: number = 1;
  collection: any[];  
  itemsPerPage: number = 6;

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.homeService.getProducts()
      .subscribe(res => {
        this.homeService.products = res as Products[];
        // this.collectionSize = this.homeService.products.length;
        this.collection =  res as Products[];
      });
    }
}
