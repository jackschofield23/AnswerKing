import {DialogController} from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

@autoinject
export class CardPrompt {
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
