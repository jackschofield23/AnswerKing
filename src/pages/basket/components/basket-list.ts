import { autoinject, bindable, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../basket';

@autoinject
export class BasketListCustomElement {
  constructor(private events: EventAggregator,     
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService) {
    
  }

  public basket: Basket = Basket.getInstance();

  private subscriptions: Subscription[] = [];



  public async created(){
    //this.categories = await this.categoriesService.getCategories();
  }

  public attached() {
    this.subscriptions.push(
      this.events.subscribe('category:added', this.orderAdded)
    );
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  private orderAdded(item: IItem) {
    console.log(item);
  }

  selectedidChanged(newValue, oldValue){
    //console.log(newValue);
  }

}
