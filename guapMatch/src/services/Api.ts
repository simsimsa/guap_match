import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
//import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    // prepareHeaders: (headers, {getState }) => {
    //     const token =
    //         (getState() as RootState).auth.token ||
    //         localStorage.getItem("token");//запрашиваем токен где определяем его тип 
    //     if (token) {
    //         headers.set("auth", `Bearer ${token}`); //если токен есть 
    //     }
    //     return headers;
    // },
});

const baseQueryWithPetry = retry(baseQuery, { maxRetries: 1 }); //если запрос свалился 1 раз, попробует еще раз

export const api = createApi({//импортится из редакс тулкит
    reducerPath: "splitApi", //все апишки в разных папках
    baseQuery: baseQueryWithPetry,
    refetchOnMountOrArgChange: true,//если аргумент меняется, мы перезапросим
    endpoints: ()=>({}) //пустая функция которая запускает пустой объект
});
