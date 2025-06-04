import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';
import { addTickets } from '../store/ticketsSlice';
import { ITicket } from '../common/types/ticket';

interface ITicketsResponse {
    tickets: ITicket[];
    stop: boolean;
}

const BASE_URL = 'https://aviasales-test-api.kata.academy';

const fetchSearchId = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/search`);
    const data = await response.json();
    return data.searchId;
};

const fetchTicketsBatch = async (searchId: string): Promise<ITicketsResponse> => {
    const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
    return await response.json();
};

export const fetchTickets = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
    'tickets/fetchTickets',
    async (_, { dispatch, getState }) => {
        const searchId = await fetchSearchId();
        let stop = false;
        let attempts = 0;
        const MAX_ATTEMPTS = 10;

        while (!stop && attempts < MAX_ATTEMPTS) {
            try {
                const { tickets: newTickets, stop: batchStop } = await fetchTicketsBatch(searchId);
                
                const areTicketsEqual = (a: ITicket, b: ITicket) => {
                    return (
                        a.price === b.price &&
                        a.carrier === b.carrier &&
                        a.segments[0].date === b.segments[0].date &&
                        a.segments[1].date === b.segments[1].date &&
                        a.segments[0].duration === b.segments[0].duration &&
                        a.segments[1].duration === b.segments[1].duration
                    );
                };

                const existingTickets = getState().tickets.items;
                const uniqueTickets = newTickets.filter(newTicket => 
                    !existingTickets.some(existingTicket => 
                        areTicketsEqual(existingTicket, newTicket)
                ));

                if (uniqueTickets.length > 0) {
                    dispatch(addTickets(uniqueTickets));
                }

                stop = batchStop;
                
                if (!stop) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            } catch (error) {
                attempts++;
                if (attempts >= MAX_ATTEMPTS) {
                    throw new Error('Превышено количество попыток загрузки');
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
);