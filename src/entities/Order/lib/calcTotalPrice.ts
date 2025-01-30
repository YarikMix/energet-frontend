import { T_Order } from "entities/Order/model/types/Order.ts";

export const calculateTotalPrice = (order: T_Order) => {
    return order.items.reduce(function (currentSum, currentItem) {
        return currentSum + currentItem.price;
    }, 0);
};
