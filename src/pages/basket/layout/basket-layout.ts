import { CurrencyFormatValueConverter } from './../../../resources/value-converters/currency-format';
import { ChangePrompt } from './../dialog/change-dialog';
import { DialogService } from 'aurelia-dialog';
import { autoinject, bindable, observable } from 'aurelia-framework';

import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';
import { Basket } from '../basket';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { AppRouter } from 'aurelia-router';
import { PaymentsService } from 'services/payments/payments-service';
import { CardPrompt } from '../dialog/card-dialog';
import { NotenoughPrompt } from '../dialog/notenough-dialog';
import { StringLiteral } from '@babel/types';

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

  private subscriptions: Subscription[] = [];
  
  public basketlist: IBasketItem[] = this.basket.BasketList;  
  public allitems: IItem[] = [];

  @observable
  public baskettotal: number = 0;

  @observable
  public cashamount: number;
  
  @observable public cardname: string;
  @observable public cardnum: string;
  @observable public cardexpirydate: string;
  @observable public cardcvv: string;


  public cash: boolean = false;
  public card: boolean = false;

  public disableorderbutton = true;

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

    this.basketlist.forEach((item, key, arr) => {
      this.baskettotal += (item.item.price * item.quantity);
      if(Object.is(arr.length - 1, key)){
        this.events.publish('totalprice', this.baskettotal);
      }
    });
    
    this.subscriptions.push(
      this.events.subscribe('basketadded', payload =>{
         this.baskettotal += payload.item.price;
      }),  
      this.events.subscribe('basketremoved', payload =>{
        this.baskettotal -= payload.item.price;
      }),  
      this.events.subscribe('basketdeleted', payload =>{
        this.baskettotal -= (payload.item.price * payload.quantity);
      }),
      this.events.subscribe('cash', payload =>{
        this.card = false;
        this.cash = true;
      }),
      this.events.subscribe('card', payload =>{
        this.card = true;
        this.cash = false;
      })
    );

  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  private async cardpayment(){
    if(this.cardexpirydate && this.cardname.length > 0 && this.cardnum.length > 0 && this.cardcvv.length > 0)
    {
      const paymentupdate : IPaymentUpdate = {orderId: this.basket.orderId, amount: this.baskettotal};
      var response = await this.paymentsService.payOrder(paymentupdate);

      if(response.complete){
        this.dialogService.open( {viewModel: CardPrompt, model: `${response.change}`}).then(response => {
  
          if (!response.wasCancelled) {
             console.log('OK');
             this.appRouter.navigateToRoute('ordercomplete');
          } else {
             this.appRouter.navigateToRoute('ordercomplete');
          }
          console.log(response);
       });
      }
    }
  }

  private async cashpayment(){
    if(this.cashamount != undefined && this.cashamount > 0){
      if(this.baskettotal > this.cashamount){
        this.dialogService.open( {viewModel: NotenoughPrompt, model: `${this.baskettotal - this.cashamount}`}).then(response => {
    
          if (!response.wasCancelled) {
             console.log('OK');
          } else {
             console.log('cancelled');
          }
          console.log(response);
       });
      }
      else{
        const paymentupdate : IPaymentUpdate = {orderId: this.basket.orderId, amount: this.cashamount};
        var response = await this.paymentsService.payOrder(paymentupdate);
  
        if(response.change > 0 && response.complete){
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

  cardnameChanged(){
    this.checkCardDetails();
  }
  cardnumChanged(){
    this.checkCardDetails();
  }
  cardcvvChanged(){
    this.checkCardDetails();
  }
  cardexpirydateChanged(){
    this.checkCardDetails();
  }

  public checkCardDetails(){
    if(this.card && this.cardname != undefined && this.cardnum != undefined && this.cardcvv != undefined && this.cardexpirydate != undefined && this.cardname != "" && this.cardnum != "" && this.cardcvv != "" && this.cardexpirydate != ""){
      this.disableorderbutton = false;
    }
    else{
      this.disableorderbutton = true;
    }
  }
  cashamountChanged(){
    console.log(this.cashamount);
    if(this.cashamount >= this.baskettotal && this.cash){
      this.disableorderbutton = false;
    }
    else{
      this.disableorderbutton = true;
    }

  }
}
