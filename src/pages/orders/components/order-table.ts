import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject
export class OrderTableCustomElement {
  constructor(private events: EventAggregator) {}

  private subscriptions: Subscription[] = [];

  public attached() {
    this.subscriptions.push(
      this.events.subscribe('order:added', this.orderAdded)
    );
  }

  public detached() {
    this.subscriptions.forEach(s => s.dispose());
  }

  private orderAdded(item: IItem) {
    console.log(item);
  }
}
