import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModalRef,
  NgbModalOptions,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, of, tap } from 'rxjs';
import { productFormMetaData } from '../../models/product.metadata';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct | any>;
  productsLoaded: boolean = false;
  addingNewProduct = false;
  newProductForm: FormGroup = this.fb.group({});
  selectedProductId: number | any;
  selectedProduct: IProduct = new IProduct();
  actionType: string = '';
  loadingInProgress = false;
  showToaster = false;
  showPassword = false;
  toasterMessage = '';
  productFormMetaData = productFormMetaData;
  @ViewChild('content') content: any;
  @ViewChild('productsSelect') productsSelect: any;
  modalInstant: NgbModalRef | any;
  modalRef: NgbModalRef | any;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    scrollable: false,
    size: 'md',
  };

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productService.getProductsList().pipe(
      map((products) =>
        products.map((product: any) => ({
          text: `${product.productName}`,
          value: product.id,
        }))
      ),
      tap(() => (this.productsLoaded = true))
    );
  }
  selectProductOption() {
    if (this.selectedProductId) {
      this.loadingInProgress = true;
      this.productService
        .getProductById(this.selectedProductId)
        .subscribe((res) => {
          this.selectedProduct = res;
          if (this.selectedProductId) {
            this.addingNewProduct = true;
            this.addNewProductFormInit();
            this.loadingInProgress = false;
          }
        });
    } else {
      this.newProductForm.reset();
    }
  }
  addNewProduct() {
    this.selectedProductId = 0;
    this.addingNewProduct = true;
    this.productsSelect.close();
    this.selectedProduct = new IProduct();
    this.addNewProductFormInit();
  }
  addNewProductFormInit() {
    this.newProductForm = this.fb.group({
      [productFormMetaData.productName]: [
        { value: this.selectedProduct.productName, disabled: false },
        [Validators.required],
      ],
      [productFormMetaData.productType]: [
        { value: this.selectedProduct.productType, disabled: false },
        [Validators.required],
      ],
      [productFormMetaData.productCategory]: [
        { value: this.selectedProduct.productCategory, disabled: false },
        [Validators.required],
      ],
      [productFormMetaData.isSubCategory]: [
        { value: this.selectedProduct.isSubCategory, disabled: false },
      ],
      [productFormMetaData.referenceId]: [
        {
          value: this.selectedProduct.referenceId
            ? this.selectedProduct.referenceId
            : null,
          disabled: false,
        },
        [Validators.pattern('[0-9]+')],
      ],
      [productFormMetaData.password]: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
          ),
        ],
      ],
      [productFormMetaData.deliveryFeesValue]: [
        {
          value: this.selectedProduct.deliveryFeesValue
            ? this.selectedProduct.deliveryFeesValue
            : null,
          disabled: false,
        },
        [Validators.required, Validators.pattern('[0-9]+')],
      ],
      [productFormMetaData.deliveryFeesPercent]: [
        {
          value: this.selectedProduct.deliveryFeesPercent
            ? this.selectedProduct.deliveryFeesPercent
            : null,
          disabled: false,
        },
        [
          Validators.max(100),
          Validators.required,
          Validators.pattern('[0-9]+'),
        ],
      ],
    });
  }

  addUpdateProduct() {
    if (this.newProductForm.valid) {
      this.actionType = 'save';
      this.loadingInProgress = true;
      const newProduct: IProduct = this.newProductForm.value;
      if (!this.selectedProductId) {
        this.productService.addProduct(newProduct).subscribe(
          (results: any) => {
            this.selectedProductId = results.length;
            this.selectProductOption();
            this.products$ = of(results);
            this.products$ = this.products$.pipe(
              map((products) =>
                products.map((product: any) => ({
                  text: `${product.productName}`,
                  value: product.id,
                }))
              )
            );
            this.addingNewProduct = false;
            this.showToasterMessage(1);
            this.loadingInProgress = false;
          },
          (error) => {}
        );
      } else {
        this.productsLoaded = false;
        const productId = this.selectedProductId;
        this.productService.updateProduct(newProduct, productId).subscribe(
          (results: IProduct) => {
            this.products$ = of(results);
            this.products$ = this.products$.pipe(
              map((products) =>
                products.map((product: any) => ({
                  text: `${product.productName}`,
                  value: product.id,
                }))
              )
            );

            this.showToasterMessage(1);
            this.productsLoaded = true;
            this.loadingInProgress = false;
          },
          (error) => {}
        );
      }
    }
    this.closeModal();
  }
  deleteProduct(productId: number) {
    this.actionType = 'delete';
    this.products$ = of([]);
    this.loadingInProgress = true;
    this.productService.deleteProduct(productId).subscribe(
      (results: IProduct) => {
        this.selectedProductId = null;
        this.products$ = of(results);
        this.products$ = this.products$.pipe(
          map((products) =>
            products.map((product: any) => ({
              text: `${product.productName}`,
              value: product.id,
            }))
          )
        );
        this.addingNewProduct = false;
        this.selectedProductId = null;
        this.newProductForm.reset();
        this.showToasterMessage(2);
        this.loadingInProgress = false;
      },
      (error) => {}
    );
    this.closeModal();
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  closeToast() {
    this.showToaster = false;
  }
  showToasterMessage(type: number) {
    this.showToaster = true;
    this.toasterMessage = '';
    if (type == 1) {
      this.toasterMessage = 'Changes saved successfully';
    } else {
      this.toasterMessage = 'Product deleted successfully';
    }
  }
  openModal(content: any) {
    this.modalInstant = this.modalService.open(content, this.ngbModalOptions);
  }

  closeModal() {
    this.modalInstant.close();
  }
}
