import { autoinject, bindable, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../basket';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class BasketLayout {
  constructor(
    private events: EventAggregator,  
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService
  ) {}

  public basket: Basket = Basket.getInstance();

  
  public basketlist: IBasketItem[] = this.basket.BasketList;

  @observable
  public baskettotal: number = 0;

  attached(){
    this.basketlist.forEach(item => {
      this.baskettotal += (item.item.price * item.quantity);
    });

    this.events.subscribe('basketadded', payload =>{
       this.baskettotal += payload.item.price;
    });

    this.events.subscribe('basketremoved', payload =>{
      this.baskettotal -= payload.item.price;
    });

    this.events.subscribe('basketdeleted', payload =>{
      this.baskettotal -= (payload.item.price * payload.quantity);
    });

  }

}
