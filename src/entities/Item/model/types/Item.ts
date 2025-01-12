export type T_Item = {
    id: number;
    name: string;
    item_type: ItemOption;
    item_producer: ItemOption;
    status: E_ItemStatus;
    price: number;
    image: string;
    owner: number;
};

export enum E_ItemStatus {
    Created = 0,
    Confirmed = 1,
    Deleted = 2,
}

export type ItemOption = {
    id: number;
    name: string;
};
