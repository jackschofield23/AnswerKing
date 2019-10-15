import { Basket } from './../../../pages/basket/basket';
import { autoinject, observable, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';


import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';

@autoinject
export class MainNavCustomElement {
  constructor(private events: EventAggregator,  
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService
  ) {}

  private subscriptions: Subscription[] = [];

  @observable
  public basketquantity: number = 0;


  public attached() {
    this.subscriptions.push(
      this.events.subscribe('basketadded', payload =>{
        this.basketquantity += 1;
      })
    );
    this.subscriptions.push(
      this.events.subscribe('basketremoved', payload =>{
          this.basketquantity -= 1;               
      })
    );
    this.subscriptions.push(
      this.events.subscribe('basketdeleted', payload =>{
          this.basketquantity -= payload.quantity;        
      })
    );
   
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

}
