import { Tabs } from 'antd';
import './Tabs.scss';

const CustomTabs: React.FC = () => {
    const items = [
        { key: '1', label: 'Самый дешевый' },
        { key: '2', label: 'Самый быстрый' },
        { key: '3', label: 'Оптимальный' },
    ];

    return (
        <div className="Tabs">
            <Tabs 
                defaultActiveKey="1" 
                items={items} 
                className="custom-ant-tabs"
            />
        </div>
    );
};

export default CustomTabs;