import { Checkbox } from 'antd';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleFilter } from '../../store/filtersSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const filterState = useSelector((state: RootState) => state.filter);

    const filterOptions = [
        { label: 'Все', key: 'all' },
        { label: 'Без пересадок', key: 'noStops' },
        { label: '1 пересадка', key: 'oneStop' },
        { label: '2 пересадки', key: 'twoStops' },
        { label: '3 пересадки', key: 'threeStops' },
    ];

    const handleFilterChange = (optionKey: keyof typeof filterState) => {
        dispatch(toggleFilter({ option: optionKey }));
    };

    return (
        <aside className="filter">
            <h3 className="filter__title">Количество пересадок</h3>
            {filterOptions.map((option) => (
                <div key={option.label} className="filter__checkbox">
                    <Checkbox
                        checked={filterState[option.key as keyof typeof filterState]}
                        onChange={() => handleFilterChange(option.key as keyof typeof filterState)}
                    >
                        {option.label}
                    </Checkbox>
                </div>
            ))}
        </aside>
    );
};

export default Filter