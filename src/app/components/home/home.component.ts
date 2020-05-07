import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.homeService.getProducts()
      .subscribe(res => {
        this.homeService.products = res as Products[];
        console.log(res);
      });
    }
}
