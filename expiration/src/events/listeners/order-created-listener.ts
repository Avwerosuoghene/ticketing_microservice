import { Listener, OrderCreatedEvent, Subjects } from "@ksntickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener <OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){

        // This gives us a time in milliseconds
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to process the job:', delay)

        // This enqueues a job using our expirataion queue
        // The arg passed inside here is defined by the interface in our expiration queue
        await expirationQueue.add({
            orderId: data.id
        }, 
        {
            delay
        }
        );

        msg.ack();
    }
}