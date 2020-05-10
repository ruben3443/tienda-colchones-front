import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product-type.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.less'],
  providers: [LoginService, ProductTypeService]
})
export class ProductTypeComponent implements OnInit {

  constructor(private productTypeService: ProductTypeService, private route: ActivatedRoute,  private loginService: LoginService) { }
  logged = this.loginService.isLoggedIn();
  isAdmin = this.loginService.isAdmin();
  product_type: string;

  p: number = 1;
  collection: any[];  
  itemsPerPage: number = 6;

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.product_type = this.route.snapshot.paramMap.get('type');
    this.productTypeService.getProductsByType(this.product_type)
      .subscribe(res => {
        this.productTypeService.products = res as Products[];
        this.collection =  res as Products[];
      });
    }
}
