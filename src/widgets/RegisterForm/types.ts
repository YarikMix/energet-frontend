import { E_UserRole } from "entities/User/model/types/User.ts";

export type T_UserRegisterCredentials = {
    email: string;
    phone: string;
    name: string;
    password: string;
    repeatPassword: string;
    role: E_UserRole;
};
