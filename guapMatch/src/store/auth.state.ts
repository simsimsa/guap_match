import { create, StateCreator } from "zustand";
import { LoginUser, RegisterUser, User } from "../types";
import axios, { AxiosError } from "axios";
import { API } from "../constants";
import { devtools, persist } from "zustand/middleware";

type AuthSate = {
    accessToken: null | string;//есть ли токен
    error: null | string; //вылетела ли ошибка
    user: null | User; //есть ли юзер
};

type AuthActions = {
    login: ({ email, password }: LoginUser) => void;//типизируем функцию
    register: (requestData: RegisterUser) => void; //типизируем регистрашку
    getProfile: (accessToken: string) => void; //типизируем токен который к нам придет
};

const authSlice: StateCreator<
    AuthSate & AuthActions,
    [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
    accessToken: null,
    error: null,
    user: null,
    login: async ({ email, password }) => {
        try {
            const { data } = await axios.post<string>(
                API.login,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            set({ accessToken: data, error: null });//получаем токен при успехе
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data }); //указываем ошибку
            }
        }
    },
    register: async (requestData) => {
        try {
            const { data } = await axios.post(API.register, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            set({ accessToken: data, error: null });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });
            }
        }
    },
    getProfile: async (accessToken) => {
        try {
            const { data } = await axios.get<User>(API.profile, {//получаем токен
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ user: data, error: null });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data });//если что-то пошло не так
            }
        }
    },
});

export const useAuthStore = create<AuthActions & AuthSate>()(
    devtools(
        persist(authSlice, {
            name: "authStore",
        }),
        {
            name: "authStore",
        }
    )
);//тут написан хук который можно везде юзать

