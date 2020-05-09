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

  selectedFile: File;

  constructor(private loginService: LoginService, private createProductService: CreateProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  isAdmin = this.loginService.isAdmin();
  logged = this.loginService.isLoggedIn();

  create_product(form: NgForm){

    const uploadData = new FormData();
    var date = new Date();
    var timestamp = date.getTime();
    var new_file_name = timestamp.toString() + "_" + this.selectedFile.name;
    uploadData.append('myFile', this.selectedFile, new_file_name);

    this.createProductService.create_product_service(form.value, uploadData, new_file_name)
    .subscribe(res => {
      console.log(res);
      
      this.router.navigateByUrl("/");
    });
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }
}
