import { E_OrderStatus } from "entities/Order/model/types/Order.ts";

export const ITEMS_PAGE_SIZE = 8;

export const ORDER_STATUSES = {
    [E_OrderStatus.Draft]: "Черновик",
    [E_OrderStatus.InWork]: "В пути",
    [E_OrderStatus.Completed]: "Доставлен",
    [E_OrderStatus.Rejected]: "Отменен",
    [E_OrderStatus.Deleted]: "Удален",
};
