import './TicketsList.scss';
import Ticket from '../Ticket/Ticket';

const TicketsList: React.FC = () => {
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