import './App.scss';
import Header from '../Header';
import Filter from '../Filter';
import MenuTabs from '../MenuTabs';
import TicketsList from '../TicketsList';

const App = () => {
    return (
        <div className="container">
            <Header />
            <main className="main">
                <Filter />
                <article className="article">
                    <MenuTabs />
                    <TicketsList />
                </article>
            </main>
        </div>
    );
};

export default App;
