import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct, IOrder } from '../../shared/interfaces';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  pSub: Subscription;
  rSub: Subscription;
  noOrders: IOrder;
  product: IProduct;

  private orderServ: OrderService;

  constructor(orderServ: OrderService) {
    this.orderServ = orderServ;
  }

  public ngOnInit(): void {
    this.pSub = this.orderServ.getAll().subscribe((orders) => {
      this.orders = orders;
    });
  }

  public ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
    }
    this.rSub.unsubscribe();
  }

  public remove(id: string): void {
    this.rSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter((orders: any) => orders.id !== id);
    });
  }
}
