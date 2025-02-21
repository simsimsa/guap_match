export type LoginUser = {
    email: string;
    password: string;
};

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
};

export type updateUser = {
    name?: string;
    password?: string;
    gender?: string;
    age?: string;
    napravl?: string;
    course?: string;
    life?: string;
    home?: string;
    aboutYou?:string;
    avatar?: string;
};

export interface User {
    id: string;
    name: string;
    number: string;
    gender: "MALE" | "FEMALE";
    email: string;
    age: string;
    napravl: string;
    locked: boolean;
    role: "USER";
    authority: string;
    active: boolean;
    frontendStatus: boolean;
}
