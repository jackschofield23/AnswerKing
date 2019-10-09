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
