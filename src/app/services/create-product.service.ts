import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProduct } from '../models/create-product';
import { Products } from '../models/products';
import { Users } from '../models/users';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  new_product =  new CreateProduct();
  readonly URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
  }

  create_product_service(product: CreateProduct): Observable<Products>{
    return this.http.post<Products>(`${this.URL}/products/${product.type}`,
    product).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }
}
