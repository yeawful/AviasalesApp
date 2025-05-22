import './Ticket.scss';
import S7Logo from '../../assets/img/S7Logo.svg';

const Ticket: React.FC = () => {
    return (
        <section className="Ticket">
        <div className="Ticket__header">
            <span className="Ticket__price">13 400 Р</span>
            <img 
            className="Ticket__logo" 
            src={S7Logo}
            alt="Airline Logo" 
            />
        </div>

        <div className="Ticket__info">
            <div className="Ticket__row">
            <div className="Ticket__column">
                <div className="Ticket__cities">MOW – HKT</div>
                <div className="Ticket__time">10:45 – 08:00</div>
            </div>
            <div className="Ticket__column">
                <div className="Ticket__cities">HKT – MOW</div>
                <div className="Ticket__time">11:20 – 00:50</div>
            </div>
            </div>

            <div className="Ticket__row">
            <div className="Ticket__column">
                <div className="Ticket__way">В пути</div>
                <div className="Ticket__timeLength">21ч 15м</div>
            </div>
            <div className="Ticket__column">
                <div className="Ticket__way">В пути</div>
                <div className="Ticket__timeLength">13ч 30м</div>
            </div>
            </div>

            <div className="Ticket__row">
            <div className="Ticket__column">
                <div className="Ticket__stops-count">2 пересадки</div>
                <div className="Ticket__stops-cities">HKG, JNB</div>
            </div>
            <div className="Ticket__column">
                <div className="Ticket__stops-count">1 пересадка</div>
                <div className="Ticket__stops-cities">HKG</div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Ticket;