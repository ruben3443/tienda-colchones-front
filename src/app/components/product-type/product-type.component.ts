import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/product-type.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.less'],
  providers: [ProductTypeService]
})
export class ProductTypeComponent implements OnInit {

  constructor(private productTypeService: ProductTypeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    var product_type = this.route.snapshot.paramMap.get('type');
    this.productTypeService.getProductsByType(product_type)
      .subscribe(res => {
        this.productTypeService.products = res as Products[];
      });
    }
}
