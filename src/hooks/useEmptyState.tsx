import { Empty } from 'antd';
import { ReactNode } from 'react';

export const useEmptyState = (
    isEmpty: boolean,
    isFiltersSelected: boolean,
    isLoading: boolean,
): ReactNode | null => {
    if (!isFiltersSelected) {
        return <Empty description="Рейсов, подходящих под заданные фильтры, не найдено" />;
    }
    if (isEmpty && !isLoading) {
        return <Empty description="Билеты не найдены" />;
    }
    return null;
};
