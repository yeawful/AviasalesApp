import './Header.scss';
import AviasalesLogo from '../../assets/img/Logo.svg'

const Logo: React.FC = () => {
    return (
        <img src={AviasalesLogo} alt="Aviasales logo" className="Logo" />
    );
};

export default Logo;