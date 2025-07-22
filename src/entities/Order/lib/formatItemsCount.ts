import { T_Order } from "entities/Order/model/types/Order.ts";
import { declineWord } from "shared/utils/decline/decline.ts";

const calculateItemsCount = (order: T_Order) => {
    return order.items.length;
};

export const formatItemsCount = (order: T_Order) => {
    const itemsCount = calculateItemsCount(order);
    return `${itemsCount} ${declineWord(itemsCount, ["товар", "товара", "товаров"])}`;
};
