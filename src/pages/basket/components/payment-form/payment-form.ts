import { autoinject, bindable, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../../basket';
import { AppRouter } from 'aurelia-router';

@autoinject
export class PaymentFormCustomElement {
  constructor(private events: EventAggregator,
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter) {

  }


  private subscriptions: Subscription[] = [];

  public basket: Basket = Basket.getInstance();



  public async created() {
    //this.categories = await this.categoriesService.getCategories();
  }

  public attached() {
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }  

}
