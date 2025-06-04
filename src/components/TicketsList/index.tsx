import './index.scss';
import Ticket from '../Ticket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { fetchTickets } from '../../api/ticketApi';
import { Empty, Progress } from 'antd';

const TicketsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: tickets, status } = useSelector((state: RootState) => state.tickets);
    const filterState = useSelector((state: RootState) => state.filter);
    const activeTab = useSelector((state: RootState) => state.tabs);
    const [visibleTickets, setVisibleTickets] = useState(5);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        dispatch(fetchTickets() as any);
    }, [dispatch]);

    const isAnyFilterSelected = useMemo(() => {
        return filterState.all || filterState.noStops || filterState.oneStop || 
            filterState.twoStops || filterState.threeStops;
    }, [filterState]);

    const filteredTickets = useMemo(() => {
        if (!isAnyFilterSelected) return [];

        return tickets.filter(ticket => {
            const stopsCounts = ticket.segments.map(segment => segment.stops.length);
            
            return stopsCounts.some(stops => 
                (filterState.all) ||
                (stops === 0 && filterState.noStops) ||
                (stops === 1 && filterState.oneStop) ||
                (stops === 2 && filterState.twoStops) ||
                (stops === 3 && filterState.threeStops)
            );
        });
    }, [tickets, filterState, isAnyFilterSelected]);

    const sortedTickets = useMemo(() => {
        return [...filteredTickets].sort((a, b) => {
            const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
            const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);

            switch (activeTab) {
                case 'cheapest':
                    return a.price - b.price;
                case 'fastest':
                    return durationA - durationB;
                case 'optimal':
                    return (a.price + durationA) - (b.price + durationB);
                default:
                    return 0;
            }
        });
    }, [filteredTickets, activeTab]);

    const loadMoreTickets = useCallback(() => {
        if (visibleTickets < sortedTickets.length && !isFetching) {
            setIsFetching(true);
            setVisibleTickets(prev => prev + 5);
            setIsFetching(false);
        }
    }, [visibleTickets, sortedTickets.length, isFetching]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
            
            if (isNearBottom) {
                loadMoreTickets();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreTickets]);

    const loadingIndicator = status === 'loading' && (
        <div className="loading-indicator">
            <Progress percent={Math.min((tickets.length / 100) * 100, 90)} 
                    status="active" 
                    showInfo={false} 
                    strokeColor="#1890ff" />
            <div className="loading-text">Идет загрузка билетов...</div>
        </div>
    );

    if (!isAnyFilterSelected) {
        return (
            <div className="TicketsList">
                {loadingIndicator}
                <div className="TicketsList__empty">
                    <Empty description="Рейсов, подходящих под заданные фильтры, не найдено" />
                </div>
            </div>
        );
    }

    if (sortedTickets.length === 0 && status !== 'loading') {
        return (
            <div className="TicketsList">
                {loadingIndicator}
                <div className="TicketsList__empty">
                    <Empty description="Билеты не найдены" />
                </div>
            </div>
        );
    }

    return (
        <div className="TicketsList">
            {loadingIndicator}
            
            {sortedTickets.slice(0, visibleTickets).map((ticket, index) => (
                <Ticket 
                    key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}-${ticket.segments[1].date}-${index}`}
                    price={ticket.price}
                    carrier={ticket.carrier}
                    segments={ticket.segments}
                />
            ))}
        </div>
    );
};

export default TicketsList;