import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateProduct } from '../models/create-product';
import { Products } from '../models/products';
import { Users } from '../models/users';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from "moment";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(private loginService: LoginService, private http: HttpClient) { 
  }

  new_product =  new CreateProduct();  //Object to store new product to be created
  readonly URL = 'http://localhost:3000'; //URL base for this module
  headers = new HttpHeaders({'Authorization':this.loginService.getToken()}); //Authorization header

  /**
   * Method to update product with HTTP POST request
   * @param form 
   * @param uploadFileData 
   * @param fileName 
   */
  create_product_service(form, uploadFileData: FormData, fileName: string): Observable<Products>{

    var product = new CreateProduct();
    product.name=form.name;
    product.description = form.description;
    product.type = form.type;
    product.price = form.price;
    product.units = form.units;
    product.important = form.important;
    product.discount = form.discount;
    product.imgPath = this.URL + "/imgs/" + fileName;

    //It uploads the img first with HTTP POST request
    this.http.post(`${this.URL}/upload/file`, uploadFileData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
    });
      
    //Finally uploads the product with HTTP POST request and authorization headers
    return this.http.post<Products>(`${this.URL}/products/${product.type}`
    , product, {headers: this.headers}).pipe(tap(
      (res) => {
        if(res){
          console.log(res);
        }
      })
    );
  }
}
