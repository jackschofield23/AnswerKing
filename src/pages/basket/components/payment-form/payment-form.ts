import { autoinject, bindable, observable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../../basket';
import { AppRouter } from 'aurelia-router';
import { ValidationRules,
  ValidationControllerFactory,
  ValidationController,
  validateTrigger,
  Validator,} from 'aurelia-validation';





  

@autoinject
export class PaymentFormCustomElement {
  constructor(private events: EventAggregator,
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter,
    private controllerFactory: ValidationControllerFactory,
    private validationController: ValidationController,
    private validator: Validator,
    private validationRules: ValidationRules
    ) {

      this.controller = controllerFactory.createForCurrentScope(validator);

      ValidationRules.customRule(
        'amountCoversTotalPrice',
        value => value >= this.totalprice,
        `\${$displayName} must cover the total price of the order`
      );  

      ValidationRules.ensure('cashamount')
      .displayName('Amount')
      .required()
      .then()
      .withMessage(`\${$displayName} must be a valid price`)
      .then()
      .satisfiesRule('amountCoversTotalPrice')
      .when((m: PaymentFormCustomElement) => m.displaycash)
      .on(this);

    this.controller.validateTrigger = validateTrigger.changeOrBlur;
   
    }

  controller: ValidationController;

  @observable
  public selectedpayment: boolean;

  public displaycash: boolean = false;
  public displaycard: boolean = false;

  public totalprice: number;

  public cashamountvalid: boolean = true;



  @bindable
  public cardname: string;
  @bindable
  public cardnum: string;
  @bindable
  public cardexpirydate: string;
  @bindable
  public cardcvv: string;

  @bindable
  public cashamount: number;

  private subscriptions: Subscription[] = [];

  public basket: Basket = Basket.getInstance();

  public async created() {
  }

  public attached() {
    this.subscriptions.push(
      this.events.subscribe('totalprice', payload =>{
         this.totalprice = payload;
      })
     );
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }  

  selectedpaymentChanged(){
    if(this.selectedpayment){
      this.displaycard = false;
      this.displaycash = true;
      this.events.publish('cash');
    }
    else if(!this.selectedpayment){
      this.displaycard = true;
      this.displaycash = false;
      this.events.publish('card');
    }
  }

  cashamountChanged(newvalue, oldvalue){

    try{
      var num = +this.cashamount;
    }
    catch{
      this.cashamountvalid = false;
    }
   
  }
}
