import Queue from "bull";
import {ExpirationCompletePublisher} from "../events/publishers/expiration-complete-publisher";
import {natsWrapper} from "../nats-wrapper";

// This interface gives information stored in the job
interface Payload {
  orderId: string;
}

// the first arg in Queue is the name of the chanel(use any name we want), the
// second arg is the option object, e.g letting the queue know we want to use reddis
const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    // This was declared as a variable in our redis deployment
    host: process.env.REDIS_HOST,
  },
});

// This job object wraps up our data and also has some information about the job itself
// This below defines what we want to do whenever we receive a job
expirationQueue.process(async (job) => {
 new ExpirationCompletePublisher(natsWrapper.client).publish({
  orderId: job.data.orderId
 })
});

export {expirationQueue}
