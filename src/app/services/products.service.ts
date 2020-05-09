import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedProduct: Products;
  product_type: String;
  
  readonly URL  = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }


  getProductByID(type='', id=''){
    return this.http.get(this.URL + '/' + type + '/' + id);
  }

  updateProduct(form): Observable<Products>{
    return this.http.put<Products>(`${this.URL}/${form.type}/${form._id}`,
    {
      name: form.name,
      description: form.description,
      price: form.price,
      units: form.units,
      important: form.important,
      discount: form.discount
    }).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }

  deleteProduct(form): Observable<String>{
    return this.http.delete<String>(`${this.URL}/${form.type}/${form._id}`,
    {}).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }

}
