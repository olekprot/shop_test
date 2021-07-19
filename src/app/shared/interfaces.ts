export interface FbResponse {
  name: string;
}

export interface IProduct {
  type: string;
  id?: string;
  title: string;
  photo: string;
  info: string;
  price: string;
  date: Date;
}

export interface IOrder {
  id?: string;
  address: string;
  date: Date;
  name: string;
  orders: IProduct[];
  payment: string;
  phone: string;
  price: number;
}

export interface IResponse<T> {
  [key: string]: T;
}
