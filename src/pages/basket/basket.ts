
export class Basket{

  private static _instance: Basket;

  public BasketList: IBasketItem[] = [];

  private constructor(){}

  // public static get Instance()
  // {
  //   return this._instance || (this._instance = new this());
  // }

  static getInstance(): Basket {
    if(!Basket._instance){
      Basket._instance = new Basket();
    }

    return Basket._instance;
  }

  public static addToBasket(basketitem : IBasketItem){

  }

}
