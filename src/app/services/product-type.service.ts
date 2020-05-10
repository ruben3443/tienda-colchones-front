import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) { }

  selectedProduct: Products; //Object to store selected product and use it in the controllers
  products: Products[];  //Object to store obtained products and use them in the controllers
  readonly URL  = 'http://localhost:3000/products/'; //URL base for this module

  /**
   * Method to get all products by type with HTTP get request
   * @param type 
   */
  getProductsByType(type=''){
    return this.http.get(this.URL + type);
  }
}
