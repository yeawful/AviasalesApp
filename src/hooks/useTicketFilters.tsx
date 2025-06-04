import { useMemo } from 'react';
import { ITicket } from '../common/types/ticket';
import { FilterState } from '../store/filtersSlice';

export const useTicketFilters = (tickets: ITicket[], filterState: FilterState) => {
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

    return {
        isAnyFilterSelected,
        filteredTickets
    };
};

export type UseTicketFiltersReturn = ReturnType<typeof useTicketFilters>;