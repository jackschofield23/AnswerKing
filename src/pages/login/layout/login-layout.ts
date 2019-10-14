import { autoinject, bindable, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';


@autoinject
export class LoginLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService
  ) {}



}
