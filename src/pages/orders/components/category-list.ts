import { autoinject, bindable, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';

@autoinject
export class CategoryListCustomElement {
  constructor(private events: EventAggregator,     
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService) {
    
  }

  private subscriptions: Subscription[] = [];

  @bindable
  public categories: ICategory[] = [];

  @bindable
  public selectedid: ICategoryId;


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

  select(category) {
    this.selectedid = category.id;
    return true;
  }


}
