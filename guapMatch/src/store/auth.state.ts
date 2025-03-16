import { create, StateCreator } from "zustand";
import { Chat, LoginUser, RegisterUser, updateUser, User } from "../types";
import axios, { AxiosError } from "axios";
import { API } from "../constants";
import { devtools, persist } from "zustand/middleware";

type AuthSate = {
    accessToken: null | string; //есть ли токен
    error: null | string; //вылетела ли ошибка
    user: null | User; //есть ли юзер
    isLoading: boolean;
};

type AuthActions = {
    login: ({ email, password }: LoginUser) => void; //типизируем функцию
    register: (requestData: RegisterUser) => void; //типизируем регистрашку
    getProfile: (accessToken: string) => void; //типизируем токен который к нам придет
    logout: (accessToken: string | null) => void;
    updateProfile: (accessToken: string, updateData: updateUser) => void;
};

type ChatStore = {
    chats: Chat[]; // Список чатов
    selectedChat: Chat | null; // Выбранный чат
    setChats: (chats: Chat[]) => void; // Функция для обновления списка чатов
    selectChat: (chat: Chat) => void; // Функция для выбора чата
    exitinchat: () => void;
};

const authSlice: StateCreator<
    AuthSate & AuthActions,
    [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
    accessToken: null,
    error: null,
    user: null,
    isLoading: false,
    login: async ({ email, password }) => {
        set({isLoading: true});
        try {
            const { data } = await axios.post(
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
            set({ accessToken: data.accessToken, error: null, isLoading: false }); //получаем токен при успехе
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data.message, isLoading: false }); //указываем ошибку
            }
        }
    },
    register: async (requestData) => {
        set({isLoading: true})
        try {
            const { data } = await axios.post(API.register, requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            set({ accessToken: data.accessToken, error: null, isLoading: false });
            console.log(data.accessToken);
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data, isLoading: false });
            }
        }
    },
    getProfile: async (accessToken) => {
        set({ isLoading: true });
        try {
            const { data } = await axios.get<User>(API.profile, {
                //получаем токен
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ user: data, error: null, isLoading: false });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data, isLoading: false }); //если что-то пошло не так
                console.log(error);
            }
        }
    },
    logout: async (accessToken) => {
        if (accessToken) set({ accessToken: null, user: null });
    },
    updateProfile: async (accessToken, updateData) => {
        set({ isLoading: true});
        try {
            const { data } = await axios.patch<User>(
                API.updateProfile,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            set({ user: data, error: null, isLoading: false });
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.response?.data, isLoading: false });
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
); //тут написан хук который можно везде юзать

const loadSelectedChat = (): Chat | null => {
    const savedChat = localStorage.getItem("selectedChat");
    return savedChat ? JSON.parse(savedChat) : null;
};

export const useChatStore = create<ChatStore>((set) => ({
    chats: [], // Начальное состояние (пустой список чатов)
    selectedChat: loadSelectedChat(), // Восстановление выбранного чата из localStorage
    setChats: (chats) => set({ chats }), // Обновление списка чатов
    selectChat: (chat) => {
        localStorage.setItem("selectedChat", JSON.stringify(chat)); // Сохранение выбранного чата в localStorage
        set({ selectedChat: chat }); // Обновление состояния
    },
    exitinchat: () => {
        localStorage.removeItem("selectedChat");
    },
}));
