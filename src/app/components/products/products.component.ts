import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  providers: [LoginService, ProductsService]
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService, private route: ActivatedRoute,  private loginService: LoginService) { }

  ngOnInit() {
    this.getProduct();
  }

  logged = this.loginService.isLoggedIn(); //To check if user is logged
  isAdmin = this.loginService.isAdmin(); //To check if user is admin

  /**
   * Method to get the selected product.
   * It will get the needed params (type and id) from the URL and it will send them to the service method
   */
  getProduct(){
    var product_type = this.route.snapshot.paramMap.get('type');
    var product_id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductByID(product_type, product_id)
      .subscribe(res => {
        this.productsService.selectedProduct = res as Products;
        this.productsService.product_type = product_type;
      });
    }
}
