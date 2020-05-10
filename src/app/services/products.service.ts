import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Products } from '../models/products';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  readonly URL  = 'http://localhost:3000'; //URL base for this module
  headers = new HttpHeaders({'Authorization':this.loginService.getToken()}); //Authorization header
  selectedProduct: Products; //Object to store selected product and use it in the controllers
  product_type: String; //String to store product type and use it in the controllers
  
  /**
   * Method to get product by id with HTTP request
   * @param type 
   * @param id 
   */
  getProductByID(type='', id=''){
    return this.http.get(this.URL + '/products/' + type + '/' + id);
  }

  /**
   * Method to update product with HTTP PUT request
   * @param form 
   * @param uploadData 
   * @param new_file_name 
   */
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

    //It uploads the img first with HTTP POST request
    this.http.post(`${this.URL}/upload/file`, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      console.log(event);
    });

    //Finally uploads the product with HTTP PUT request and authorization headers
    return this.http.put<Products>(`${this.URL}/products/${form.type}/${form._id}`,product, {headers: this.headers}
    ).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }

  /**
   * Method to delete product by id with HTTP delete request
   * @param form 
   */
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
