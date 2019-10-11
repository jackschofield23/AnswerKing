import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from 'pages/basket/basket';

@autoinject
export class ItemListCustomElement {
  constructor(private events: EventAggregator,     
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService) {
    
  }

  private subscriptions: Subscription[] = [];
  @bindable
  public items: IItem[] = [];
  public selectedId: ICategoryId;

  public basket: Basket = Basket.getInstance();

  public async created(){
    //this.items = await this.itemService.getItems();
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

  addButtonClick(item: IItem){
      this.basket.addToBasketSingle(item, 1);
      console.log(this.basket.BasketList);
  }

  minusButtonClick(item: IItem){
    this.basket.minusToBasketSingle(item, 1);
    console.log(this.basket.BasketList);
  }

  quantityUpdated() {
    

  }
}
