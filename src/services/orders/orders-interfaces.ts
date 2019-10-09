interface IOrder {
  id: string;
  createdOn: string;
  lastUpdated: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  lineItems: ILineItemProduct[];
}

interface ILineItem {
  product: ILineItemProduct;
  quantity: number;
  subtotal: number;
}

interface ILineItemProduct {
  id: string;
  category: ILineItemProductCategory;
  description: string;
  name: string;
  price: number;
}

interface ILineItemProductCategory {
  id: string;
  name: string;
  description: string;
}

/**
 * This is the model that the API expects when
 * updating the order.
 */
interface IOrderUpdate {
  lineItems: ILineItemUpdate[];
}

interface ILineItemUpdate {
  item: IItemId;
  quantity: number;
}
