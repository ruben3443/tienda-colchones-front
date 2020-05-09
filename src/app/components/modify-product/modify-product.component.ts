import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CreateProductService } from '../../services/create-product.service';
import { ProductsService } from '../../services/products.service';
import { NgForm } from '@angular/forms';
import { CreateProduct } from '../../models/create-product';
import { Products } from '../../models/products';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.less'],
  providers: [LoginService, CreateProductService, ProductsService]
})
export class ModifyProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private loginService: LoginService, private createProductService: CreateProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }

  isAdmin = this.loginService.isAdmin();
  logged = this.loginService.isLoggedIn();
  selectedFile: File;

  getProduct(){
    var product_type = this.route.snapshot.paramMap.get('type');
    var product_id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductByID(product_type, product_id)
      .subscribe(res => {
        this.productsService.selectedProduct = res as Products;
        this.productsService.product_type = product_type;
      });
    }

    modify_product(form: NgForm){
      const uploadData = new FormData();
      var date = new Date();
      var timestamp = date.getTime();
      var new_file_name = timestamp.toString() + "_" + this.selectedFile.name;
      uploadData.append('myFile', this.selectedFile, new_file_name);

      this.productsService.updateProduct(form.value, uploadData, new_file_name)
      .subscribe(res => {
        this.router.navigateByUrl("/");
      });
    }

    delete_product(form: NgForm){
      this.productsService.deleteProduct(form.value)
      .subscribe(res => {
        // this.router.navigate(['/']);
        this.router.navigateByUrl("/");
      });
    }

    onFileChanged(event){
      this.selectedFile = event.target.files[0];
    }
}
