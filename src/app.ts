import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';

//require('bootstrap/dist/css/bootstrap.min.css');
//require('bootstrap');
var numeral = require('numeral');

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
        route: 'login',
        name: 'login',
        title: 'login',
        moduleId: PLATFORM.moduleName('pages/login/layout/login-layout'),
      },
      {
        route: 'admin',
        name: 'admin',
        title: 'Admin',
        moduleId: PLATFORM.moduleName('pages/admin/layout/admin-layout'),
      },
      {
        route: 'orders',
        name: 'order',
        title: 'Order',
        moduleId: PLATFORM.moduleName('pages/orders/layout/orders-layout'),
      },
      {
        route: 'orders/:id',
        name: 'orderdetail',
        title: 'Order',
        moduleId: PLATFORM.moduleName('pages/orders/layout/orders-layout'),
      },
      {
        route: 'basket',
        name: 'basket',
        title: 'Basket',
        moduleId: PLATFORM.moduleName('pages/basket/layout/basket-layout'),
      },      
    ]);
  }
}
