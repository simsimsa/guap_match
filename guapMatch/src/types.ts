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
    gender?: "FEMALE" | "MALE" ;
    age?: null | number;
    napravl?: null | string;
    course?: null | string;
    life?: null | string;
    home?: null | string;
    aboutYou?: null | string;
    avatarPath?: null | string;
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
    active: boolean;
    course: string;
    life?: string;
    home?: string;
    aboutYou?: string;
}

export interface Chat {
    id: number; // Добавим id для идентификации чата
    avatar: string;
    avtor: string;
    message: string;
    time: string;
}
