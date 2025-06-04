import { ITicket } from '../common/types/ticket';

export const generateTicketKey = (ticket: ITicket, index: number): string => {
    return `${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}-${ticket.segments[1].date}-${index}`;
};