import { Checkbox } from 'antd';
import './Filter.scss';

const Filter = () => {
    const filterOptions = [
        { label: 'Все' },
        { label: 'Без пересадок' },
        { label: '1 пересадка' },
        { label: '2 пересадки' },
        { label: '3 пересадки' },
    ];

    return (
        <aside className="filter">
            <h3 className="filter__title">Количество пересадок</h3>
            {filterOptions.map((option) => (
                <div key={option.label} className="filter__checkbox">
                    <Checkbox>{option.label}</Checkbox>
                </div>
            ))}
        </aside>
    );
};

export default Filter;