import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';
import { addTickets } from '../store/ticketsSlice';

export interface Ticket {
    price: number;
    carrier: string;
    segments: [
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        },
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        }
    ];
}

interface TicketsResponse {
    tickets: Ticket[];
    stop: boolean;
}

const BASE_URL = 'https://aviasales-test-api.kata.academy';

const fetchSearchId = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/search`);
    const data = await response.json();
    return data.searchId;
};

const fetchTicketsBatch = async (searchId: string): Promise<TicketsResponse> => {
    const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
    return await response.json();
};

export const fetchTickets = createAsyncThunk<Promise<void>, void, { dispatch: AppDispatch; state: RootState }>(
    'tickets/fetchTickets',
    async (_, { dispatch }) => {
        const searchId = await fetchSearchId();
        let stop = false;

        while (!stop) {
            try {
                const { tickets, stop: batchStop } = await fetchTicketsBatch(searchId);
                if (tickets.length > 0) {
                    dispatch(addTickets(tickets));
                }
                stop = batchStop;
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