import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects
    data: any;
}

// Abstract variables and methods must be defined by classes that extends them.
export abstract class Listener <T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    private client: Stan;
    abstract onMessage(data: T['data'], msg: Message): void;
  
    // Protected means the class that extends can choose to define it or not
    protected ackWait = 5 * 1000;
  
    constructor(client: Stan) {
      this.client = client;
    }
  
      //   **The setmanualhack mode enables reprocess of a failed event
  
    //  ** setDeliverAllAvailable enables our listener to get all events it missed and its only used for the first time the durable name item/service is brought online
  
    //   **setDurableName enables nats to know if the service with the indicated tag name has processed a given event, so only unprocessed events is processed whenever a service comes back online after going off
  
    //  **Adding queue group ensures that if all services goes down in the queue group, the subscription isn't terminated by nats
    subscriptionOptions() {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName);
    }
  
    listen() {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroupName,
        this.subscriptionOptions()
      );
  
      subscription.on("message", (msg: Message) => {
        console.log(`Message received ${this.subject} / ${this.queueGroupName}`);
  
        const parseData = this.parseMessage(msg);
        this.onMessage(parseData, msg);
      });
    }
  
    parseMessage(msg: Message) {
      const data = msg.getData();
      return typeof data === "string"
        ? JSON.parse(data)
        : JSON.parse(data.toString("utf8"));
    }
  }