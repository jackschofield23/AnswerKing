import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Basket } from '../../pages/basket/basket';

@autoinject
export class PaymentsService {
  constructor(private http: HttpClient) { }


  public async payOrder(paymentupdate: IPaymentUpdate): Promise<IOrder> {

    const response = await this.http.put(`/order/pay/${paymentupdate.orderId}?amount=${paymentupdate.amount}`);

    if (response.status == 400) {
      return null;
    }
    // We need to await the deserialisation
    // of the response body.
    const order: IOrder = await response.json();
    console.log(order);

    return order;
  }

}
