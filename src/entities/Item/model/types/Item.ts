export type T_Item = {
    id: number;
    name: string;
    type: E_ItemType;
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

export enum E_ItemType {
    Accumulator = 0,
    SolarBattery = 1,
    WindTurbine = 2,
}
