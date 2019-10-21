import {DialogController} from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

@autoinject
export class NotenoughPrompt {
  constructor(
    private dialogController: DialogController
  ) {
    this.dialogController.settings.centerHorizontalOnly = true;
  }

  public message: string 
  
  activate(message: string) {
    this.message = message;
 }

}
