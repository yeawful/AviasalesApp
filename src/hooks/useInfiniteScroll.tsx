import { useState, useCallback, useEffect } from 'react';

export const useInfiniteScroll = (totalItems: number, step = 5) => {
    const [visibleCount, setVisibleCount] = useState(step);
    const [isFetching, setIsFetching] = useState(false);

    const loadMore = useCallback(() => {
        if (visibleCount < totalItems && !isFetching) {
            setIsFetching(true);
            setVisibleCount(prev => prev + step);
            setIsFetching(false);
        }
    }, [visibleCount, totalItems, isFetching, step]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
            if (isNearBottom) loadMore();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return { visibleCount, loadMore };
};