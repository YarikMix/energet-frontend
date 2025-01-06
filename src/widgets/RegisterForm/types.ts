export type RegisterCredentials = {
    email: string;
    phone: string;
    name: string;
    password: string;
    repeatPassword: string;
    role: E_UserRole;
};

export enum E_UserRole {
    Buyer = 0,
    Producer = 1,
    Moderator = 2,
}
