import { api } from "./Api";
import { User } from "../types";

//мы берем апи из файла где мы создали это апи и добавляем
//так как постзапрос и мы меняем базу данных пишем мутэйшен
//query возвращает нам объект
export const UserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            { token: string },
            { email: string; password: string }
        >({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
        }),
        register: builder.mutation<
            { email: string; password: string; name: string },
            { email: string; password: string; name: string }
        >({
            query: (userData) => ({
                url: "register",
                method: "POST",
                body: userData,
            }),
        }),
        current: builder.query<User, void>({
            query: () => ({
                url: "/current",
                method: "GET",
            }),
        }),
        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: "GET",
            }),
        }),
        updateUser: builder.mutation<User, { userData: FormData; id: string }>({
            query: ({ userData, id }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: userData,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation,
} = UserApi;
//так как мы в этом запросе меняем бд

export const {
    endpoints: {login, register, current, getUserById, updateUser}
} = UserApi