import { autoinject } from 'aurelia-framework';
import { OrdersService } from 'services/orders/orders-service';
import { AppRouter } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import {
  AlertModal,
  IAlertModalOptions,
} from 'resources/modals/alert/alert-modal';
import { Basket } from 'pages/basket/basket';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class WelcomeLayout {
  constructor(
    private appRouter: AppRouter,
    private dialogService: DialogService,
    private ordersService: OrdersService,
    private events: EventAggregator
  ) {}

  public executing: boolean = false;

  public basket: Basket = Basket.getInstance();

  public async confirmStart() {
    const options: IAlertModalOptions = {
      title: 'Happy Ordering!',
      message:
        'Welcome to Answer King. The best restaurant in town.',
    };

    const { wasCancelled } = await this.dialogService
      .open({
        viewModel: AlertModal,
        model: options,
      })
      .whenClosed();

    if (!wasCancelled) {
      await this.startOrder();
    }
  }

  public async startOrder() {
 
    this.basket.BasketList = [];
    this.events.publish('basketset'); 
    this.appRouter.navigateToRoute('order');
  }
}
