export enum E_UserRole {
    Buyer = 0,
    Producer = 1,
    Moderator = 2,
}

export type T_User = {
    id: number;
    role: E_UserRole;
    is_authenticated: boolean;
    name?: string;
    phone?: string;
    email?: string;
};

export type T_UserState = {
    userInfo: null | T_User;
    is_authenticated: boolean;
};
