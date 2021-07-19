import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  type = 'Phone';
  private router: Router;
  private productServ: ProductService;

  constructor(router: Router, productServ: ProductService) {
    this.productServ = productServ;
    this.router = router;
  }

  public ngOnInit(): void {}

  public setType(type: string): void {
    this.type = type;

    if (this.type !== 'Cart') {
      void this.router.navigate(['/'], {
        queryParams: {
          type: this.type,
        },
      });
      this.productServ.setType(this.type);
    }
  }
}
