import { CurrencyFormatValueConverter } from './../../../resources/value-converters/currency-format';
import { ChangePrompt } from './../dialog/change-dialog';
import { DialogService } from 'aurelia-dialog';
import { autoinject, bindable, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../basket';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AppRouter } from 'aurelia-router';
import { PaymentsService } from 'services/payments/payments-service';

@autoinject
export class BasketLayout {
  constructor(
    private events: EventAggregator,  
    private orderService: OrdersService,
    private paymentsService: PaymentsService,
    private itemService: ItemService,
    private appRouter: AppRouter,
    private dialogService: DialogService
  ) {}

  public basket: Basket = Basket.getInstance();

  
  public basketlist: IBasketItem[] = this.basket.BasketList;  
  public allitems: IItem[] = [];

  @observable
  public baskettotal: number = 0;

  public cashamount: number;
  public carddetails: ICardDetails;

  public cash: boolean = false;
  public card: boolean = false;

  private orderId: string;

  public async activate(params) {
    this.orderId = params.id;
  }

  public async attached(){

    if(this.orderId){
      this.events.publish('orderid', this.orderId);
      this.allitems = await this.itemService.getItems();
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

    this.events.publish('basketset');  
    

    this.basketlist.forEach(item => {
      this.baskettotal += (item.item.price * item.quantity);
    });

    this.events.subscribe('basketadded', payload =>{
       this.baskettotal += payload.item.price;
    });

    this.events.subscribe('basketremoved', payload =>{
      this.baskettotal -= payload.item.price;
    });

    this.events.subscribe('basketdeleted', payload =>{
      this.baskettotal -= (payload.item.price * payload.quantity);
    });
    this.events.subscribe('cash', payload =>{
      this.card = false;
      this.cash = true;
    });
    this.events.subscribe('card', payload =>{
      this.card = true;
      this.cash = false;
    });
  }

  private cardpayment(){
    this.dialogService.open( {viewModel: ChangePrompt, model: 'Are you sure?' }).then(response => {
  
      if (!response.wasCancelled) {
         console.log('OK');
      } else {
         console.log('cancelled');
      }
      console.log(response);
   });
  }

  private async cashpayment(){
    if(this.cashamount != undefined && this.cashamount > 0){
      const paymentupdate : IPaymentUpdate = {orderId: this.basket.orderId, amount: this.cashamount};
      var response = await this.paymentsService.payOrder(paymentupdate);

      if(response.change > 0){
        this.dialogService.open( {viewModel: ChangePrompt, model: `${response.change}`}).then(response => {
  
          if (!response.wasCancelled) {
             console.log('OK');
          } else {
             console.log('cancelled');
          }
          console.log(response);
       });
      }
    }
  }
  public placeorderclick(){
    if(this.basket.BasketList.length >= 1){
      if(this.card && !this.cash){
        this.cardpayment();
      }
      else if(!this.card && this.cash){
        this.cashpayment();
      }      
    }
  }
}
