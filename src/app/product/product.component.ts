import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private productServ: ProductService) {}

  public ngOnInit(): void {}

 public addProduct(product: IProduct): void {
    this.productServ.addProduct(product);
  }
}
