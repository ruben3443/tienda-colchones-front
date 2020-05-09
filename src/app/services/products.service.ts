import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Products } from '../models/products';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedProduct: Products;
  product_type: String;
  
  readonly URL  = 'http://localhost:3000';
  constructor(private loginService: LoginService, private http: HttpClient) { }

  headers = new HttpHeaders({'Authorization':this.loginService.getToken()});


  getProductByID(type='', id=''){
    return this.http.get(this.URL + '/products/' + type + '/' + id);
  }

  updateProduct(form, uploadData, new_file_name): Observable<Products>{

    var product = {
      name: form.name,
      description: form.description,
      price: form.price,
      units: form.units,
      important: form.important,
      discount: form.discount,
      imgPath: this.URL + "/imgs/" + new_file_name
    }
    this.http.post(`${this.URL}/upload/file`, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event);
      });

    return this.http.put<Products>(`${this.URL}/products/${form.type}/${form._id}`,product, {headers: this.headers}
    ).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }

  deleteProduct(form): Observable<String>{
    return this.http.delete<String>(`${this.URL}/products/${form.type}/${form._id}`,
    {headers: this.headers}).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }

}
