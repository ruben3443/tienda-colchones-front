import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedProduct: Products;
  product_type: String;
  
  readonly URL  = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }


  getProductByID(type='', id=''){
    return this.http.get(this.URL + type + '/' + id);
  }
}
