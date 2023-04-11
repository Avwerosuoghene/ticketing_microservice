import { Subjects, TicketUpdatedEvent} from '@ksntickets/common';
import { Publisher } from "@ksntickets/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {

    // This ensures we can't change the type of this subject to any other type
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
};