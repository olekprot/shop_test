import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IProduct } from '../shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct>;

  @ViewChild('loading', { static: false })
  loading: ElementRef;

  private productServ: ProductService;

  private route: ActivatedRoute;

  constructor(productServ: ProductService, route: ActivatedRoute) {
    this.route = route;
    this.productServ = productServ;
  }

  public ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      switchMap((params) => {
        if (params.id !== null) {
          return this.productServ.getById(params.id);
        }
        return of<IProduct>();
      })
    );
  }

  public addProduct(product: IProduct): void {
    this.productServ.addProduct(product);
  }
}
