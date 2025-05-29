import './index.scss';
import { Ticket as TicketType } from '../../api/ticketApi';
import { formatPrice, formatTime, formatDuration, formatStops } from '../../utils/format';

interface TicketProps {
    ticket: TicketType;
}

const Ticket = ({ ticket }: TicketProps) => {
    return (
        <section className="ticket">
            <div className="ticket__header">
                <span className="ticket__price">{formatPrice(ticket.price)}</span>
                <img 
                    className="ticket__logo" 
                    src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
                    alt="Airline Logo" 
                />
            </div>

            <div className="ticket__info">
                <div className="ticket__row">
                    {ticket.segments.map((segment, index) => (
                        <div key={`cities-${index}`} className="ticket__column">
                            <span className="ticket__cities">{segment.origin} – {segment.destination}</span>
                            <span className="ticket__time">{formatTime(segment.date, segment.duration)}</span>
                        </div>
                    ))}
                </div>

                <div className="ticket__row">
                    {ticket.segments.map((segment, index) => (
                        <div key={`duration-${index}`} className="ticket__column">
                            <span className="ticket__way">В пути</span>
                            <span className="ticket__timeLength">{formatDuration(segment.duration)}</span>
                        </div>
                    ))}
                </div>

                <div className="ticket__row">
                    {ticket.segments.map((segment, index) => (
                        <div key={`stops-${index}`} className="ticket__column">
                            <span className="ticket__stops-count">{formatStops(segment.stops)}</span>
                            <span className="ticket__stops-cities">{segment.stops.join(', ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Ticket;