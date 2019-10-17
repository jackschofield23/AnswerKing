interface IPayment {
  id: string;
  orderId: string;
  amount: number;
  orderTotal: number;
  change: number;
  date: string;
}

interface IPaymentUpdate {
  orderId: string;
  amount: number;
}

interface ICardDetails {
  name: string;
  cardnumber: string;
  expirydate: string;
  CVV: string;
}

interface ICashDetails {
  amount: number;
}
