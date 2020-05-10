import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CreateProductService } from '../../services/create-product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.less'],
  providers: [LoginService, CreateProductService]
})
export class CreateProductComponent implements OnInit {

  constructor(private loginService: LoginService, private createProductService: CreateProductService, private router: Router) { }

  ngOnInit() {
  }

  isAdmin = this.loginService.isAdmin(); //To check if user is admin
  logged = this.loginService.isLoggedIn(); //To check if user is logged
  selectedFile: File; //Object to store the selected product img

  /**
   * Method to create the product.
   * It will get the template from data and it will send it to the service method
   * @param form 
   */
  create_product(form: NgForm){

    const uploadData = new FormData();
    var date = new Date();
    var timestamp = date.getTime();
    var new_file_name = timestamp.toString() + "_" + this.selectedFile.name; //The img name will contain the current timestamp to prevent conflicts if it is the same with an existing one
    uploadData.append('myFile', this.selectedFile, new_file_name); //The img will be upload with a FormData form

    this.createProductService.create_product_service(form.value, uploadData, new_file_name)
    .subscribe(res => {
      console.log(res);
      
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
