import { autoinject, bindable, observable } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { CategoriesService } from 'services/categories/categories-service';
import { OrdersService } from 'services/orders/orders-service';
import { ItemService } from 'services/items/item-service';


@autoinject
export class LoginLayout {
  constructor(
    private orderService: OrdersService,
    private categoriesService: CategoriesService,
    private itemService: ItemService,
    private appRouter: AppRouter
  ) {}

  @bindable
  public password: string;

  @bindable
  public username: string;

  private correctpassword: string = "testpass";
  private correctusername: string = "testuser@gmail.com";

  public usernamevalid: boolean = false;
  public passwordvalid: boolean = false;

  passwordChanged(newvalue, oldvalue) {
    if (this.password.length > 6 || this.password.length < 1 || this.password == undefined) {
      this.passwordvalid = true;
    }
    else {
      this.passwordvalid = false;
    }
  }

  loginClicked() {
    if (this.username == this.correctusername && this.password == this.correctpassword) {
      this.appRouter.navigateToRoute('admin');
    }
    else {
      alert("Incorrect username or password");
    }
  }
}
