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

  ngOnInit() {
    this.getProducts();
  }

  logged = this.loginService.isLoggedIn(); //To check if user is logged
  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  product_type: string; //String to store prroduct type and use it on the template

  p: number = 1; //Initial page for the pagination service
  itemsPerPage: number = 6; //Items per page for the pagination service

  /**
   * Method to get all the products by type.
   * It will get the product type from the URL and it will send it to the service method
   */
  getProducts(){
    this.product_type = this.route.snapshot.paramMap.get('type');
    this.productTypeService.getProductsByType(this.product_type)
      .subscribe(res => {
        this.productTypeService.products = res as Products[];
      });
    }
}
