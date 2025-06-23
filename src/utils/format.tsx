export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' Р';
};

export const formatTime = (date: string, duration: number) => {
    const departure = new Date(date);
    const arrival = new Date(departure.getTime() + duration * 60000);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return `${formatTime(departure)} – ${formatTime(arrival)}`;
};

export const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
};

export const formatStops = (stops: string[]) => {
    const count = stops.length;
    if (count === 0) return 'Без пересадок';
    if (count === 1) return '1 пересадка';
    return `${count} пересадки`;
};
