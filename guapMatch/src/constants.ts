export const PREFIX ="http://localhost:3000"; //внутренняя переменная, сама пересобирается

export const API = {
    login: `${PREFIX}/users/login`,
    register: `${PREFIX}/users/register`,
    profile: `${PREFIX}/users/me`,
};
