import { Progress } from 'antd';
import { ReactNode } from 'react';

export const useLoadingIndicator = (isLoading: boolean, progress: number): ReactNode => {
    if (!isLoading) return null;

    return (
        <div className="loading-indicator">
            <Progress
                percent={Math.min(progress, 90)}
                status="active"
                showInfo={false}
                strokeColor="#1890ff"
            />
            <div className="loading-text">Идет загрузка билетов...</div>
        </div>
    );
};
