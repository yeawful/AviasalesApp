import { Checkbox } from 'antd';
import './Filter.scss';

const Filter: React.FC = () => {
    return (
        <aside className="Filter">
            <h3 className="Filter__title">Количество пересадок</h3>
            <div className="Filter__checkbox">
                <Checkbox>
                    Все
                </Checkbox>
            </div>
            <div className="Filter__checkbox">
                <Checkbox>
                    Без пересадок
                </Checkbox>
            </div>
            <div className="Filter__checkbox">
                <Checkbox>
                    1 пересадка
                </Checkbox>
            </div>
            <div className="Filter__checkbox">
                <Checkbox>
                    2 пересадки
                </Checkbox>
            </div>
            <div className="Filter__checkbox">
                <Checkbox>
                    3 пересадки
                </Checkbox>
            </div>
        </aside>
    );
};

export default Filter;