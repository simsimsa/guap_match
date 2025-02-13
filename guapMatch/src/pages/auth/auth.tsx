import { FormEvent, useEffect, useState } from "react";
import styles from "./auth.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.state";
//import { useLazyCurrentQuery, useLoginMutation } from "../../services/userApi";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Auth() {
    //const [login, {isLoading}] = useLoginMutation();//через бэк проверяю существование этого пользователя
    const [err, seterror] = useState("");
    const navigate = useNavigate();
    const { login, accessToken, error } = useAuthStore();
    //const [triggerCurrent] = useLazyCurrentQuery();//через бэк запрашиваю этого пользователя

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]); //пока не делаю нужен токен, тут будет переход

    const myError = () => {
        seterror("Ошибка от Руса");//тут моя ошибка улучшится
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        seterror("");
        const target = event.target as typeof event.target & LoginForm; //тип значений которые мы вытаскиваем
        const { email, password } = target; //отправляем данные туда
        if (!email.value || !password.value || checked === false) {
            myError();
        }
        await sendLogin(email.value, password.value); //отправляем функцию для отправки на бэк
    };

    const sendLogin = async (email: string, password: string) => {
        try {
            await login({ email, password });
        } catch (error) {
            myError();
            console.error(error);//тут будет ошибка от руса
        }
    };

    const [checked, setChecked] = useState(false); //изначально галки нет
    const chengeCheckbox = () => {
        setChecked(!checked);
    }; //тут чек обработки данных

    return (
        <div className={styles["auth"]}>
            <h1>Вход</h1>
            {(err !== "" || error)&& <div className={styles["error"]}>ошибка от руса</div>}
            <form className={styles["form"]} onSubmit={submit}>
                <div className={styles["form_logo"]}>
                    <label htmlFor="email">Email</label>
                    <Input
                        type="text"
                        id="email"
                        placeholder="...@mail.ru"
                        name="email"
                    />
                </div>
                <div className={styles["form_logo"]}>
                    <label htmlFor="Password">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div className={styles["chek"]}>
                    <input
                        type="checkbox"
                        id="checkbox"
                        name="checkbox"
                        checked={checked}
                        onChange={chengeCheckbox}
                    />
                    <label htmlFor="checkbox">
                        Я подтверждаю свое согласие на обработку персональных
                        данных
                    </label>
                </div>
                <Button /*isLoading={isLoading}*/>Войти</Button>
            </form>
            <div className={styles["link_register"]}>
                <div>Еще не с нами?</div>
                <Link to="/auth/register" className={styles["register"]}>
                    Зарегестрироваться!
                </Link>
            </div>
        </div>
    );
}
