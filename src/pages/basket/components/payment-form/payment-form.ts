import { autoinject, bindable, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../../basket';
import { AppRouter } from 'aurelia-router';

@autoinject
export class PaymentFormCustomElement {
  constructor(private events: EventAggregator,
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter
    ) {}

  @observable
  public selectedpayment: boolean;

  public displaycash: boolean = false;
  public displaycard: boolean = false;

  private subscriptions: Subscription[] = [];

  public basket: Basket = Basket.getInstance();

  public async created() {
  }

  public attached() {
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }  

  selectedpaymentChanged(){
    if(this.selectedpayment){
      this.displaycard = false;
      this.displaycash = true;
    }
    else if(!this.selectedpayment){
      this.displaycard = true;
      this.displaycash = false;
    }
  }

}
