import { EventAggregator } from 'aurelia-event-aggregator';
import { isBigIntLiteral } from "@babel/types";
import { bindable, observable } from 'aurelia-framework';


export class Basket {

  private static _instance: Basket;

  @observable
  public BasketList: IBasketItem[] = [];

  public orderId: string;

  private constructor() { }

  // public static get Instance()
  // {
  //   return this._instance || (this._instance = new this());
  // }

  static getInstance(): Basket {
    if (!Basket._instance) {
      Basket._instance = new Basket();
    }

    return Basket._instance;
  }

  public addToBasketSingle(basketitem: IItem, quantity: number) {

    var items: IBasketItem[] = this.BasketList.filter(item => item.item.id == basketitem.id);

    if (items === undefined || items.length == 0) {
      var newBasketItem: IBasketItem = { item: basketitem, quantity: quantity };
      this.BasketList.push(newBasketItem);
    }
    else {
      this.BasketList.forEach(item => {
        if (item.item.id == basketitem.id) {
          item.quantity += quantity;
        }
      });
    }
  }

  public minusToBasketSingle(basketitem: IItem, quantity: number) {

    var items: IBasketItem[] = this.BasketList.filter(item => item.item.id == basketitem.id);

    if (items === undefined || items.length == 0) {
      console.log("item not found");
    }
    else {
      this.BasketList.forEach(item => {
        if (item.item.id == basketitem.id) {
          if (item.quantity == 1) {
            this.BasketList = this.BasketList.filter(e => e != item)
          }
          else {
            item.quantity -= quantity;
          }
        }
      });
    }
  }

  public retrieveFromDB(order: IOrder, allitems: IItem[]){
    this.orderId = order.id;
    if(this.BasketList.length == 0){
      order.items.forEach(inputitem => { 
        var items: IBasketItem[] = this.BasketList.filter(item => item.item.id == inputitem.id);
        
        if (items === undefined || items.length == 0) {
          var filtereditem : IItem[] = allitems.filter(item => item.id == inputitem.id);
          if(filtereditem.length == 1){
            var newBasketItem: IBasketItem = { item: filtereditem[0], quantity: 1 };
            this.BasketList.push(newBasketItem);
          }
        }
        else if (items.length == 1){ 
          items[0].quantity += 1;
        }
      });
    }
  }

  public deleteFromBasket(basketitem: IItem) {
    var items: IBasketItem[] = this.BasketList.filter(item => item.item.id == basketitem.id);

    if (items === undefined || items.length == 0) {
      console.log("item not found");
    }
    else {
      this.BasketList.forEach(item => {
        if (item.item.id == basketitem.id) {
          
          this.BasketList = this.BasketList.filter(e => e != item);        

        }
      });
    }
  }
}
