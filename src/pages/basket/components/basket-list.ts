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

  @bindable
  public basketlist: IBasketItem[] = [];


  private subscriptions: Subscription[] = [];

  public basket: Basket = Basket.getInstance();



  public async created() {
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

  selectedidChanged(newValue, oldValue) {
    //console.log(newValue);
  }


  addButtonClick(item: IBasketItem) {
    this.basket.addToBasketSingle(item.item, 1);
    console.log(this.basket.BasketList);

    const displayItem = this.basketlist.find(i => i.item.id === item.item.id);
    //displayItem.quantity += 1;

    this.events.publish('basketadded', item);
  }

  minusButtonClick(item: IBasketItem) {


    const displayItem = this.basketlist.find(i => i.item.id === item.item.id);

    if (displayItem.quantity > 1) {
      this.basket.minusToBasketSingle(item.item, 1);
      console.log(this.basket.BasketList);
      this.events.publish('basketremoved', item);
    }

  }

  deleteClick(item: IBasketItem){
    this.basket.deleteFromBasket(item.item);
    this.events.publish('basketdeleted', item);
    this.basketlist = this.basketlist.filter(e => e != item);   
  }

}
