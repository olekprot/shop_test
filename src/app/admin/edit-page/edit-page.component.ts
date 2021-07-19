import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: IProduct;
  submitted = false;
  loading: any;

  private route: ActivatedRoute;

  private productServ: ProductService;

  private router: Router;

  constructor(
    route: ActivatedRoute,
    productServ: ProductService,
    router: Router
  ) {
    this.router = router;
    this.productServ = productServ;
    this.route = route;
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productServ.getById(params.id);
        })
      )
      .subscribe((product: IProduct): void => {
        this.product = product;
        this.form = new FormGroup({
          type: new FormControl(this.product.type, [Validators.required]),
          title: new FormControl(this.product.title, [Validators.required]),
          photo: new FormControl(this.product.photo, [Validators.required]),
          info: new FormControl(this.product.info, [Validators.required]),
          price: new FormControl(this.product.price, [
            Validators.required,
            Validators.pattern(/^\d+$/),
          ]),
        });
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.productServ
      .update({
        ...this.product,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date(),
      })
      .subscribe((res: {}): void => {
        this.submitted = false;
        void this.router.navigate(['/admin', 'dashboard']);
      });
  }
}
