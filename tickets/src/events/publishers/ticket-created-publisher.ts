import { Subjects, TicketCreatedEvent} from '@ksntickets/common';
import {  Publisher } from "@ksntickets/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {

    // This ensures we can't change the type of this subject to any other type
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
};