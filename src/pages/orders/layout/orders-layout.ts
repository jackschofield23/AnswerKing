import { Basket } from './../../basket/basket';
import { autoinject, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AppRouter } from 'aurelia-router';

@autoinject
export class HomeLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private events: EventAggregator,
    private appRouter: AppRouter
  ) {}

  public categories: ICategory[] = [];
  public allitems: IItem[] = [];
  public items: IItem[] = [];
  @observable public currentCategory: ICategory;
  @observable public selectedid: ICategoryId;
  public order: IOrder;

  public basket: Basket = Basket.getInstance();

  private orderId: string;

  // since this class is handled by the Router,
  // it has an activate method which receives the
  // route parameters.
  public async activate(params) {
    this.orderId = params.id;

  }
  

  public async attached() {
    // Retrieve the order from the API
    // with the provided order id above.
    // You should not continue with the calls to other APIs
    // if the order with the given id does not exist.

    this.categories = await this.categoriesService.getCategories();
    this.allitems = await this.itemService.getItems();

    if(this.orderId){
      await this.orderService.getOrderByID(this.orderId)
      .then(order => {
        console.log(order);
        if(order == null){
          this.appRouter.navigateToRoute('error404');
        }
        else{
          this.basket.retrieveFromDB(order, this.allitems);
        }       
      });
    }

    const firstCategory : string = '0';

    if (firstCategory) {
      this.selectCategory(firstCategory);
    }

    this.events.publish('basketset');  
    this.events.publish('orderid', this.orderId);
    
  }

  valueChanged(newValue) {
    if (newValue) {}      
  }

  public selectCategory(id: string) {
    if(id == "0"){
      this.items = this.allitems;
    }
    else{
      this.categories.forEach(c => {
        if(c.id == id){
          this.currentCategory = c;
        
          this.items = this.allitems.filter(item => item.categories.some(cat => cat.id == id));
         
        }
      });
    }
  }

  selectedidChanged(newvalue, oldvalue){

    this.selectCategory(newvalue);
  }

}
