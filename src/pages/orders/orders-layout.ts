import { autoinject, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';

@autoinject
export class HomeLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService
  ) {}

  public categories: ICategory[] = [];
  public allitems: IItem[] = [];
  public items: IItem[] = [];
  @observable public currentCategory: ICategory;
  @observable public selectedid: ICategoryId;
  public order: IOrder;

  private orderId: string;

  // since this class is handled by the Router,
  // it has an activate method which receives the
  // route parameters.
  public activate(params) {
    this.orderId = params.id;
  }

  public async attached() {
    // Retrieve the order from the API
    // with the provided order id above.
    // You should not continue with the calls to other APIs
    // if the order with the given id does not exist.

    this.order = await this.orderService.getOrderByID(this.orderId);
    this.categories = await this.categoriesService.getCategories();
    this.allitems = await this.itemService.getItems();

    const firstCategory = this.categories[0];

    if (firstCategory) {
      this.selectCategory(firstCategory.id);
    }

    console.log(this.categories);
    console.log(this.items);
    console.log(this.order);
  }

  valueChanged(newValue) {
    if (newValue) {}      
  }

  public selectCategory(id: string) {
    this.categories.forEach(c => {
      if(c.id == id){
        this.currentCategory = c;
        //console.log(c);
        this.items = this.allitems.filter(item => item.categories.some(cat => cat.id == id));
        console.log(this.items);
      }
    });
  }

  selectedidChanged(newvalue, oldvalue){
    //console.log(newvalue);
    this.selectCategory(newvalue);
  }

}
