import { useMemo } from 'react';
import { ITicket } from '../common/types/ticket';

export const useTicketSorting = (tickets: ITicket[], activeTab: string) => {
    return useMemo(() => {
        if (!tickets.length) return [];

        return [...tickets].sort((a, b) => {
            const durationA = a.segments.reduce((acc, segment) => acc + segment.duration, 0);
            const durationB = b.segments.reduce((acc, segment) => acc + segment.duration, 0);

            switch (activeTab) {
                case 'cheapest':
                    return a.price - b.price;
                case 'fastest':
                    return durationA - durationB;
                case 'optimal': {
                    const weightA = a.price * 0.6 + durationA * 0.4;
                    const weightB = b.price * 0.6 + durationB * 0.4;
                    return weightA - weightB;
                }
                default:
                    return 0;
            }
        });
    }, [tickets, activeTab]);
};

export default useTicketSorting;
