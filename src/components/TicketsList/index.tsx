import './index.scss';
import Ticket from '../Ticket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { fetchTickets } from '../../api/ticketApi';

const TicketsList = () => {
    const dispatch = useDispatch();
    const { items: tickets } = useSelector((state: RootState) => state.tickets);
    const [visibleTickets, setVisibleTickets] = useState(5);

    useEffect(() => {
        dispatch(fetchTickets() as any);
    }, [dispatch]);

    const loadMoreTickets = () => {
        setVisibleTickets(prev => prev + 5);
    };

    return (
        <div className="TicketsList">
            {tickets.slice(0, visibleTickets).map((ticket, index) => (
                <Ticket 
                    key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}-${ticket.segments[1].date}-${index}`}
                    price={ticket.price}
                    carrier={ticket.carrier}
                    segments={ticket.segments}
                />
            ))}
            
            {visibleTickets < tickets.length && (
                <button 
                    className="ShowMoreTickets" 
                    onClick={loadMoreTickets}
                >
                    Показать еще 5 билетов!
                </button>
            )}
        </div>
    );
};

export default TicketsList;