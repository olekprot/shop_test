import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { IProduct } from '../shared/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  products: IProduct[] = [];
  cartProducts: any = [];
  totalPrice = 0;
  order: any;
  form: FormGroup;
  submitted = false;
  added: any = '';

  private productServ: ProductService;
  private orderServ: OrderService;

  constructor(productServ: ProductService, orderServ: OrderService) {
    this.orderServ = orderServ;
    this.productServ = productServ;
  }

  private calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.cartProducts = this.productServ.cartProducts;

    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }
  }

  public ngOnInit(): void {
    this.calculateTotalPrice();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          /^((8|\+)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        ),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      payment: new FormControl('Cash'),
    });
  }

  public remove(id: string): void {
    this.productServ.removeProduct(id);
    this.calculateTotalPrice();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.order = {
      email: this.form.value.email,
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date(),
    };
    this.orderServ.create(this.order).subscribe((res) => {
      this.form.reset();
      this.added = 'Delivery is framed';
      this.submitted = false;
    });
  }
}
