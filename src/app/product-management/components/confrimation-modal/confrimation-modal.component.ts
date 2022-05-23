import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-confrimation-modal',
  templateUrl: './confrimation-modal.component.html',
  styleUrls: ['./confrimation-modal.component.scss'],
})
export class ConfrimationModalComponent implements OnInit {
  @Input() public product!: IProduct;
  @Input() public actionType!: string;
  @Output() success = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter();
 
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  saveProduct(){
    this.save.emit();
  }
  deleteProduct(){
    this.delete.emit();
  }
}
