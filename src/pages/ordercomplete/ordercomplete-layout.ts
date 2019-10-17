import { autoinject, bindable, observable } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';


@autoinject
export class OrderCompleteLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter
  ) {}

}
