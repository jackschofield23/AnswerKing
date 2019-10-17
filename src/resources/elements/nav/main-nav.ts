import { Basket } from '../../../pages/basket/basket';
import { autoinject, observable, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';


import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { AppRouter } from 'aurelia-router';

@autoinject
export class MainNavCustomElement {
  constructor(private events: EventAggregator,
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter
  ) { }

  private subscriptions: Subscription[] = [];

  @observable
  public basketquantity: number = 0;

  public orderid: string;

  public basket: Basket = Basket.getInstance();

  public activate(){

  }

  public attached() {

    this.subscriptions.push(
      this.events.subscribe('orderid', payload => {        
         this.setOrderId(payload);
    }),
      this.events.subscribe('basketadded', payload => {
        this.basketquantity += 1;
      }),
      this.events.subscribe('basketset', payload => {
        this.populateQuantity();
      }),
      this.events.subscribe('basketdeleted', payload => {
        this.basketquantity -= payload.quantity;
      }),
      this.events.subscribe('basketremoved', payload => {
        this.basketquantity -= 1;
      })
 
    );
  }

  public setOrderId(payload){
    this.orderid = payload;   
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  public populateQuantity() {
    this.basketquantity = 0;
    const basketlist = this.basket.BasketList;

    basketlist.forEach(item => {
      this.basketquantity += item.quantity;
    });
  }

  public basketClicked() {
    if (this.orderid != undefined) {
      this.appRouter.navigateToRoute('basketid', { id: this.orderid });
    }
    else {
      this.appRouter.navigateToRoute('basket');
    }
  }

}
