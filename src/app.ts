import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';

@autoinject
export class App {
  public configureRouter(config: RouterConfiguration) {
    config.title = 'Answer King';

    config.map([
      {
        route: ['', '/'],
        redirect: 'welcome',
      },
      {
        route: 'welcome',
        name: 'welcome',
        title: 'Welcome',
        moduleId: PLATFORM.moduleName('pages/welcome/welcome-layout'),
      },
      {
        route: 'orders',
        name: 'order',
        title: 'Order',
        moduleId: PLATFORM.moduleName('pages/orders/orders-layout'),
      },
      {
        route: 'basket',
        name: 'basket',
        title: 'Basket',
        moduleId: PLATFORM.moduleName('pages/basket/basket-layout'),
      },      
    ]);
  }
}
