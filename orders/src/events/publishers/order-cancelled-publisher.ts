import {Publisher, OrderCancelledEvent, Subjects} from '@ksntickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled 
};