import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { FbResponse, IProduct, IResponse } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  type = 'Phone';
  cartProducts: IProduct[] = [];

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public create(product: IProduct): Observable<IProduct> {
    return this.http
      .post<FbResponse>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }

  public getAll(): Observable<IProduct[]> {
    return this.http
      .get<Observable<IResponse<IProduct[]>>>(
        `${environment.fbDbUrl}/products.json`
      )
      .pipe(
        map((res) => {
          return Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date),
          }));
        })
      );
  }

  public getById(id: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map((res: IProduct) => {
          return {
            ...res,
            id,
            date: new Date(res.date),
          };
        })
      );
  }

  public remove(id: string): Observable<object> {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  public update(product: IProduct): Observable<object> {
    return this.http.patch(
      `${environment.fbDbUrl}/products/${product.id}.json`,
      product
    );
  }

  public setType(type: string): void {
    this.type = type;
  }

  public addProduct(product: IProduct): void {
    this.cartProducts.push(product);
  }

  public removeProduct(id: string): void {
    let index: number;
    this.cartProducts.map((x: IProduct, i) => {
      if (x.id === id) {
        index = i;
      }
    });
    this.cartProducts.splice(index, 1);
  }
}
