import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }
  product: Products;
  ngOnInit() {
    this.getProduct();
  }
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
