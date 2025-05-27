import './index.scss';
import Ticket from '../Ticket';

const TicketsList = () => {
    return (
        <div className="TicketsList">
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <button className="ShowMoreTickets">
                Показать еще 5 билетов!
            </button>
        </div>
    );
};

export default TicketsList;