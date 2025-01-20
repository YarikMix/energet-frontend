export type T_Item = {
    id: number;
    name: string;
    item_type: T_ItemOption;
    item_producer: T_ItemOption;
    status: E_ItemStatus;
    price: number;
    weight: number;
    image: string;
    owner: number;
};

export enum E_ItemStatus {
    Created = 0,
    Confirmed = 1,
    Deleted = 2,
}

export type T_ItemOption = {
    id: number;
    name: string;
};
