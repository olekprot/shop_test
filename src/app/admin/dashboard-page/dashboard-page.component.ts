import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  pSub: Subscription;
  rSub: Subscription;
  @ViewChild('loading', { static: false })
  loading: ElementRef;
  product: IProduct;
  productName: string;

  private productServ: ProductService;

  constructor(productServ: ProductService) {
    this.productServ = productServ;
  }

  public ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe((products: IProduct[]) => {
      this.products = products;
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
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(
        (product: IProduct) => product.id !== id
      );
    });
  }
}
