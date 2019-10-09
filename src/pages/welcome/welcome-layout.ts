import { autoinject } from 'aurelia-framework';
import { OrdersService } from 'services/orders/orders-service';
import { AppRouter } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import {
  AlertModal,
  IAlertModalOptions,
} from 'resources/modals/alert/alert-modal';

@autoinject
export class WelcomeLayout {
  constructor(
    private appRouter: AppRouter,
    private dialogService: DialogService,
    private ordersService: OrdersService
  ) {}

  public executing: boolean = false;

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
    this.executing = true;
    const orderId = await this.ordersService.createOrder();
    this.executing = false;

    if (!orderId) {
      // Let the user know that something has happened.
      return;
    }

    this.appRouter.navigateToRoute('order', { id: orderId });
  }
}
