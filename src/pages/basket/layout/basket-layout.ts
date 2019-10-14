import { autoinject, bindable, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../basket';

@autoinject
export class BasketLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService
  ) {}

  public basket: Basket = Basket.getInstance();

  
  public basketlist: IBasketItem[] = this.basket.BasketList;

}
