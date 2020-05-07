import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  selectedProduct: Products;
  products: Products[];
  readonly URL  = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getProductsByType(type=''){
    return this.http.get(this.URL + type);
  }
}
