import { autoinject, bindable, observable } from 'aurelia-framework';
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
  @observable public items: IItem[] = [];
  
  @observable
  public displayitems: IBasketItem[] = [];
  public selectedId: ICategoryId;

  public basket: Basket = Basket.getInstance();
  @bindable
  public basketlist: IBasketItem[] = [];

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

      const displayItem = this.displayitems.find(i => i.item.id === item.id);
      displayItem.quantity += 1;

      this.events.publish('basketadded');
  }

  minusButtonClick(item: IItem){
    this.basket.minusToBasketSingle(item, 1);
    console.log(this.basket.BasketList);

    const displayItem = this.displayitems.find(i => i.item.id === item.id);
    
    if(displayItem.quantity > 0){
      displayItem.quantity -= 1;
      this.events.publish('basketremoved');
    }

  }

  itemsChanged(){
    this.displayitems = [];
    this.basketlist = this.basket.BasketList;
    this.items.forEach(item => {
      const tempbasketlist: IBasketItem[] = this.basketlist.filter(e => e.item.id == item.id);
      if(tempbasketlist.length == 1){
        this.displayitems.push({item: item, quantity: tempbasketlist[0].quantity});
      }
      else{
        this.displayitems.push({item: item, quantity: 0 });
      }  
    });
  }

  quantityUpdated() {
    

  }
}
