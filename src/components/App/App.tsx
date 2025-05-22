import './App.scss';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import Tabs from '../Tabs/Tabs';
import TicketsList from '../TicketsList/TicketsList';


const App: React.FC = () => {
    return (
        <div className="container">
            <Header />
            <main className="main">
                <Filter />
                <article className="article">
                    <Tabs />
                    <TicketsList />
                </article>
            </main>
        </div>
    );
};

export default App;
