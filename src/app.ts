import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';

@autoinject
export class App {
  public configureRouter(config: RouterConfiguration) {
    config.title = '🐱 El Gato Blanco';

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
        route: 'orders/:id',
        name: 'order',
        title: 'Order',
        moduleId: PLATFORM.moduleName('pages/orders/orders-layout'),
      },
    ]);
  }
}
