import { Tabs } from 'antd';
import './MenuTabs.scss';

const MenuTabs = () => {
    const items = [
        { key: '1', label: 'Самый дешевый' },
        { key: '2', label: 'Самый быстрый' },
        { key: '3', label: 'Оптимальный' },
    ];

    return (
        <div className="tabs">
            <Tabs 
                defaultActiveKey="1" 
                items={items} 
                className="custom-ant-tabs"
            />
        </div>
    );
};

export default MenuTabs;