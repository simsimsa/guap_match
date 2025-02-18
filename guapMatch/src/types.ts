export type LoginUser = {
    email: string,
    password: string
}

export type RegisterUser = {
    /*name: string;*/
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    number: string;
    gender: "MALE" | "FEMALE";
    email: string;
    enabled: boolean;
    locked: boolean;
    role: "USER";
    authority: string;
    active: boolean;
    frontendStatus: boolean;
}