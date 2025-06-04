import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { RootState } from '../../store/store';
import { setActiveTab } from '../../store/tabsSlice';

const MenuTabs = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.tabs);

    const items = [
        { key: 'cheapest', label: 'Самый дешевый' },
        { key: 'fastest', label: 'Самый быстрый' },
        { key: 'optimal', label: 'Оптимальный' },
    ];

    return (
        <div className="tabs">
            <Tabs
                activeKey={activeTab}
                onChange={(key) => dispatch(setActiveTab(key))}
                items={items}
                className="custom-ant-tabs"
            />
        </div>
    );
};

export default MenuTabs;