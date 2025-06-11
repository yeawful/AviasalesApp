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

const areTicketsEqual = (a: ITicket, b: ITicket) => 
    a.price === b.price && a.carrier === b.carrier;

export const fetchTickets = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
    'tickets/fetchTickets',
    async (_, { dispatch, getState }) => {
        const searchId = await fetchSearchId();

        let stop = false;

        while (!stop) {
            try {
                const { tickets: newTickets, stop: batchStop } = await fetchTicketsBatch(searchId);
                
                const existingTickets = getState().tickets.items;
                
                const uniqueTickets = newTickets.filter(newTicket => 
                    !existingTickets.some(existingTicket => 
                        areTicketsEqual(existingTicket, newTicket)
                    ));

                if (uniqueTickets.length > 0) {
                    dispatch(addTickets(uniqueTickets));
                }

                stop = batchStop;
            } catch (error) {
                if (error instanceof Error && error.message.includes('500')) {
                    continue;
                }
                throw error;
            }
        }
    }
);