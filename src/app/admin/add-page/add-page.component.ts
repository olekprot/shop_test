import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import { Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    photo: new FormControl(null, [Validators.required]),
    info: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
  });
  submitted = false;

  private productServ: ProductService;

  private router: Router;

  constructor(productServ: ProductService, router: Router) {
    this.router = router;
    this.productServ = productServ;
  }

  public ngOnInit(): void {}

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const product: IProduct = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    };
    this.productServ.create(product).subscribe((res: IProduct) => {
      this.form.reset();
      this.submitted = false;
      void this.router.navigate(['/']);
    });
  }
}
