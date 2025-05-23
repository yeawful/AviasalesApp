import './Header.scss';
import AviasalesLogo from '../../assets/img/Logo.svg'

const Header = () => {
    return (
        <img src={AviasalesLogo} alt="Aviasales logo" className="logo" />
    );
};

export default Header;