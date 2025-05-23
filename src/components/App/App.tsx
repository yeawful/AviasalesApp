import './App.scss';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import MenuTabs from '../MenuTabs/MenuTabs';
import TicketsList from '../TicketsList/TicketsList';


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
