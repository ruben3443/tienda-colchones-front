import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users/login', component: LoginComponent},
  { path: 'products/:type', component: ProductTypeComponent},
  { path: 'products/:type/:id', component: ProductsComponent},
  { path: 'users/logout', component: LoginComponent},
  { path: 'create/product', component: CreateProductComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    ProductTypeComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
