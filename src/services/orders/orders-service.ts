import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@autoinject
export class OrdersService {
  constructor(private http: HttpClient) {}

  public async createOrder(): Promise<string> {
    const body: IOrderUpdate = {
      lineItems: [],
    };

    const response = await this.http.post('orders', json(body));

    if (!response.ok) {
      return null;
    }

    // We need to await the deserialisation
    // of the response body.
    const order: IOrder = await response.json();
    return order.id;
  }

  
  public async getOrderByID(): Promise<IOrder[]> {
    const response = await this.http.get('orders');

    return response.ok ? response.json() : [];
  }

  public async getOrders(): Promise<IOrder[]> {
    const response = await this.http.get('orders');

    return response.ok ? response.json() : [];
  }
}
