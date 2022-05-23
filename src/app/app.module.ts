import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsComponent } from './icons/icons.component';
import { ProductsComponent } from './product-management/pages/products/products.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfrimationModalComponent } from './product-management/components/confrimation-modal/confrimation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    IconsComponent,
    LoaderComponent,
    ConfrimationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
