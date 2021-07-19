import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { FbResponse, IOrder, IResponse } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public create(order: IOrder): Observable<IOrder> {
    return this.http
      .post<FbResponse>(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date),
          };
        })
      );
  }

  public getAll(): Observable<IOrder[]> {
    return this.http
      .get<Observable<IResponse<IOrder[]>>>(
        `${environment.fbDbUrl}/orders.json`
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

  public remove(id: string): Observable<object> {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }
}
