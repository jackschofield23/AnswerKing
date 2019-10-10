import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';

@autoinject
export class ItemListCustomElement {
  constructor(private events: EventAggregator,     
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService) {
    
  }

  private subscriptions: Subscription[] = [];
  public items: IItem[] = [];
  public selectedId: ICategoryId;

  public async created(){
    this.items = await this.itemService.getItems();
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

  select(category) {
    this.selectedId = category.id;
    return true;
  }
}
