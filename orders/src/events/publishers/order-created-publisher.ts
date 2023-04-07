import { Subjects,Publisher } from '@ksntickets/common';
import { OrderCreatedEvent } from '@ksntickets/common';


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
};