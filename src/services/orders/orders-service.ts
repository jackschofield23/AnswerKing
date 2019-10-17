import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Basket } from '../../pages/basket/basket';

@autoinject
export class OrdersService {
  constructor(private http: HttpClient) { }

  private basketlist: IBasketItem[] = [];
  public basket: Basket = Basket.getInstance();

  public async createOrder(item: IBasketItem): Promise<string> {
    const itemidarray: string[] = [];
    itemidarray.push(item.item.id);
    const body: IOrderCreate = {
      items: itemidarray
    };

    const response = await this.http.post('/order', json(body));

    if (!response.ok) {
      return null;
    }
    // We need to await the deserialisation
    // of the response body.
    const order: IOrder = await response.json();

    return order.id;
  }

  public async syncOrder(orderid: string): Promise<string> {
    const itemidarray: string[] = [];

    this.basketlist = this.basket.BasketList;

    for (let i = 0; i < this.basketlist.length; i++) {
      const basketitem = this.basketlist[i];
      for (let j = 0; j < basketitem.quantity; j++) {
        itemidarray.push(basketitem.item.id);
      }
    }

    const body: IOrderCreate = {
      items: itemidarray
    };

    const response = await this.http.put(`/order/${orderid}`, json(body));

    if (!response.ok) {
      return null;
    }
    // We need to await the deserialisation
    // of the response body.
    const order: IOrder = await response.json();

    console.log(order);

    return order.id;
  }

  public async deleteOrder(orderid: string) {

  }

  public async getOrderByID(orderId: string): Promise<IOrder> {
    const response = await this.http.get(`/order/${orderId}`);

    if (!response.ok) {
      return null;
    }
    return response.ok ? response.json() : [];
  }

  public async getOrders(): Promise<IOrder[]> {
    const response = await this.http.get('/order');

    return response.ok ? response.json() : [];
  }
}
