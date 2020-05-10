import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
import { NgForm } from '@angular/forms';
import { Products } from '../../models/products';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.less'],
  providers: [LoginService, ProductsService]
})
export class ModifyProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }

  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  logged = this.loginService.isLoggedIn(); //To check if user is logged
  selectedFile: File; //Object to store the selected product img

  /**
   * Method to get the selected product.
   * It will get the needed params (type and id) from the URL and it will send them to the service method
   */
  getProduct(){
    var product_type = this.route.snapshot.paramMap.get('type');
    var product_id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductByID(product_type, product_id)
      .subscribe(res => {
        this.productsService.selectedProduct = res as Products;
        this.productsService.product_type = product_type;
      });
    }

  /**
   * Method to modify the selected product.
   * It will get the params from the template form and it will send them to the service method
   * @param form 
   */
  modify_product(form: NgForm){
      const uploadData = new FormData();
      var date = new Date();
      var timestamp = date.getTime();
      var new_file_name = timestamp.toString() + "_" + this.selectedFile.name; //The img name will contain the current timestamp to prevent conflicts if it is the same with an existing one
      uploadData.append('myFile', this.selectedFile, new_file_name); //The img will be upload with a FormData form

      this.productsService.updateProduct(form.value, uploadData, new_file_name)
      .subscribe(res => {
        this.router.navigateByUrl("/");
      });
  }

  /**
   * Method to delete the selected product.
   * It will take the form data from the template and it will send them to the actual service method
   * @param form 
   */
  delete_product(form: NgForm){
    this.productsService.deleteProduct(form.value)
    .subscribe(res => {
      // this.router.navigate(['/']);
      this.router.navigateByUrl("/");
    });
  }

  /**
   * Event to be colled when the user selects an img.
   * It will store the file in selectedFile local object
   * @param event
   */
  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }
}
