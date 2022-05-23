import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../models/product.model';
import { PRODUCTS } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  products = PRODUCTS;

  getProductsList(): Observable<IProduct | any> {
    return of(this.products).pipe(delay(2000));
  }
  addProduct(product: IProduct):  Observable<IProduct|any> {
    const id = this.products.length + 1;
    this.products.push({
      ...product,
      id,
    });
    return of(this.products).pipe(delay(1000));
  }
  getProductById(productId: number):  Observable<IProduct|any> {
    const productItem = this.products.filter(
      (item) => item.id === productId
    )[0];
    return of(productItem).pipe(delay(1000));
  }
  updateProduct(product: IProduct, id: number): Observable<IProduct|any> {
    const productIndex = this.products.findIndex(
      (item) => item.id === id
    );
    this.products[productIndex] = { ...product, id };
    console.log(this.products)
    return of(this.products).pipe(delay(1000));
  }


  deleteProduct(productId: number): Observable<IProduct|any> {
    const productIndex = this.products.findIndex(item => item.id === productId);
    this.products.splice(productIndex, 1);
    return of(this.products).pipe(delay(1000));
  }

}
