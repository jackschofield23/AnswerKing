import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@autoinject
export class AlertModal {
  constructor(private controller: DialogController) {}

  public title: string = 'Alert';

  public message: string;

  public activate(options: IAlertModalOptions) {
    const { title, message } = options;

    this.title = title;
    this.message = message;
  }

  public ok() {
    this.controller.ok();
  }

  public cancel() {
    this.controller.cancel();
  }
}

export interface IAlertModalOptions {
  title: string;
  message: string;
}
