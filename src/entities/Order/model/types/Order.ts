import { T_Item } from "entities/Item/model/types/Item.ts";
import { T_User } from "entities/User/model/types/User.ts";

export type T_Order = {
    id: number;
    status: E_OrderStatus;
    items: T_Item[];
    created_date: string;
    formation_date: string;
    owner: T_User;
    price?: number;
};

export enum E_OrderStatus {
    Draft = 0,
    InWork,
    Completed,
    Rejected,
    Deleted,
}

export type T_UpdateItemCount = {
    itemId: number;
    count: number;
};
