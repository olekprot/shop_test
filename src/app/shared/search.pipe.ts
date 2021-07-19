import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], productName = ''): IProduct[] {
    if (!productName.trim()) {
      return products;
    }
    return products.filter((product) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }
}
