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

  new_product =  new CreateProduct();
  readonly URL = 'http://localhost:3000';

  constructor(private loginService: LoginService, private http: HttpClient) { 
  }

  headers = new HttpHeaders({'Authorization':this.loginService.getToken()});

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

    this.http.post(`${this.URL}/upload/file`, uploadFileData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
      });
      
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
