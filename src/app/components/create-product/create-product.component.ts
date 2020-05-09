import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CreateProductService } from '../../services/create-product.service';
import { NgForm } from '@angular/forms';
import { CreateProduct } from '../../models/create-product';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.less'],
  providers: [LoginService, CreateProductService]
})
export class CreateProductComponent implements OnInit {

  constructor(private loginService: LoginService, private createProductService: CreateProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  logged = this.loginService.isLoggedIn();

  create_product(form: NgForm){
    this.createProductService.create_product_service(form.value)
    .subscribe(res => {
      console.log(res);
      
      this.router.navigateByUrl("/");
    });
  }

}
