import './index.scss';
import { formatPrice, formatTime, formatDuration, formatStops } from '../../utils/format';
import { ITicket } from '../../common/types/ticket';

interface ITicketProps extends Pick<ITicket, 'price' | 'carrier' | 'segments'> {}

const Ticket = ({ price, carrier, segments }: ITicketProps) => {
    return (
        <section className="ticket">
            <div className="ticket__header">
                <span className="ticket__price">{formatPrice(price)}</span>
                <img 
                    className="ticket__logo" 
                    src={`//pics.avs.io/99/36/${carrier}.png`}
                    alt="Airline Logo" 
                />
            </div>

            <div className="ticket__info">
                <div className="ticket__row">
                    {segments.map((segment, index) => (
                        <div key={`cities-${index}`} className="ticket__column">
                            <span className="ticket__cities">{segment.origin} – {segment.destination}</span>
                            <span className="ticket__time">{formatTime(segment.date, segment.duration)}</span>
                        </div>
                    ))}
                </div>

                <div className="ticket__row">
                    {segments.map((segment, index) => (
                        <div key={`duration-${index}`} className="ticket__column">
                            <span className="ticket__way">В пути</span>
                            <span className="ticket__timeLength">{formatDuration(segment.duration)}</span>
                        </div>
                    ))}
                </div>

                <div className="ticket__row">
                    {segments.map((segment, index) => (
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