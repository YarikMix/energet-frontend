export const formatItemPrice = (price: number): string => {
    return price.toLocaleString('ru-RU') + ' ₽';
};