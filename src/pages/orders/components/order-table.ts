import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject
export class OrderTableCustomElement {
  constructor(private events: EventAggregator) {}

  private subscriptions: Subscription[] = [];

  public attached() {
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  private orderAdded(item: IItem) {
    console.log(item);
  }
}
