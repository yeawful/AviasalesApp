import './index.scss';
import S7Logo from '../../assets/img/S7Logo.svg';

const Ticket = () => {
    return (
        <section className="ticket">
            <div className="ticket__header">
                <span className="ticket__price">13 400 Р</span>
                <img 
                    className="ticket__logo" 
                    src={S7Logo}
                    alt="Airline Logo" 
                />
            </div>

            <div className="ticket__info">
                <div className="ticket__row">
                    <div className="ticket__column">
                        <span className="ticket__cities">MOW – HKT</span>
                        <span className="ticket__time">10:45 – 08:00</span>
                    </div>
                    <div className="ticket__column">
                        <span className="ticket__cities">HKT – MOW</span>
                        <span className="ticket__time">11:20 – 00:50</span>
                    </div>
                </div>

                <div className="ticket__row">
                    <div className="ticket__column">
                        <span className="ticket__way">В пути</span>
                        <span className="ticket__timeLength">21ч 15м</span>
                    </div>
                    <div className="ticket__column">
                        <span className="ticket__way">В пути</span>
                        <span className="ticket__timeLength">13ч 30м</span>
                    </div>
                </div>

                <div className="ticket__row">
                    <div className="ticket__column">
                        <span className="ticket__stops-count">2 пересадки</span>
                        <span className="ticket__stops-cities">HKG, JNB</span>
                    </div>
                    <div className="ticket__column">
                        <span className="ticket__stops-count">1 пересадка</span>
                        <span className="ticket__stops-cities">HKG</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ticket;