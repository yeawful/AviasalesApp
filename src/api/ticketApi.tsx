import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';
import { addTickets } from '../store/ticketsSlice';
import { ITicket } from '../common/types/ticket';

interface ITicketsResponse {
    tickets: ITicket[];
    stop: boolean;
}

const BASE_URL = 'https://aviasales-test-api.kata.academy';
const MAX_TICKETS_LIMIT = 1000;

const fetchSearchId = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/search`);
    const data = await response.json();
    return data.searchId;
};

const fetchTicketsBatch = async (searchId: string): Promise<ITicketsResponse> => {
    const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
    return await response.json();
};

export const fetchTickets = createAsyncThunk<Promise<void>, void, { dispatch: AppDispatch; state: RootState }>(
    'tickets/fetchTickets',
    async (_, { dispatch }) => {
        const searchId = await fetchSearchId();
        let stop = false;
        let totalTicketsLoaded = 0;

        while (!stop && totalTicketsLoaded < MAX_TICKETS_LIMIT) {
            try {
                const { tickets, stop: batchStop } = await fetchTicketsBatch(searchId);
                
                if (tickets.length > 0) {
                    const remainingTickets = MAX_TICKETS_LIMIT - totalTicketsLoaded;
                    const ticketsToAdd = tickets.slice(0, remainingTickets);
                    
                    dispatch(addTickets(ticketsToAdd));
                    totalTicketsLoaded += ticketsToAdd.length;
                }
                
                stop = batchStop || totalTicketsLoaded >= MAX_TICKETS_LIMIT;
                
                await new Promise(resolve => setTimeout(resolve, 300));
            } catch (error) {
                if (error instanceof Error && error.message.includes('500')) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }
                throw error;
            }
        }
    }
);