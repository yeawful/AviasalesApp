import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import './index.scss';
import Ticket from '../Ticket';
import { fetchTickets } from '../../api/ticketApi';
import { useTicketFilters } from '../../hooks/useTicketFilters';
import { useTicketSorting } from '../../hooks/useTicketSorting';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useLoadingIndicator } from '../../hooks/useLoadingIndicator';
import { useEmptyState } from '../../hooks/useEmptyState';
import { generateTicketKey } from '../../utils/generateTicketKey';

const TicketsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: tickets, status } = useSelector((state: RootState) => state.tickets);
    const filterState = useSelector((state: RootState) => state.filter);
    const activeTab = useSelector((state: RootState) => state.tabs);

    const { isAnyFilterSelected, filteredTickets } = useTicketFilters(tickets, filterState);
    const sortedTickets = useTicketSorting(filteredTickets, activeTab);

    const { visibleCount } = useInfiniteScroll(sortedTickets.length);
    const loadingIndicator = useLoadingIndicator(
        status === 'loading',
        (tickets.length / 100) * 100,
    );
    const emptyState = useEmptyState(
        sortedTickets.length === 0,
        isAnyFilterSelected,
        status === 'loading',
    );

    useEffect(() => {
        dispatch(fetchTickets() as any);
    }, [dispatch]);

    if (emptyState) {
        return <div className="TicketsList">{emptyState}</div>;
    }

    return (
        <div className="TicketsList">
            {loadingIndicator}

            {sortedTickets.slice(0, visibleCount).map((ticket, index) => (
                <Ticket
                    key={generateTicketKey(ticket, index)}
                    price={ticket.price}
                    carrier={ticket.carrier}
                    segments={ticket.segments}
                />
            ))}
        </div>
    );
};

export default TicketsList;
