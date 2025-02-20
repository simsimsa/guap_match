import { FormEvent, useEffect, useState } from "react";
import styles from "./auth.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.state";
import { toast, ToastContainer } from "react-toastify";
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
    const navigate = useNavigate();
    const { login, accessToken, error } = useAuthStore();

    const errorFunc = () => {
        if (checked == false) {
            toast.error("Подтвердите согласие на обработку данных", {
                position: "bottom-right",
                className: "error",
            });
        }
    };

    useEffect(() => {
        if (accessToken && !error && checked) {
            navigate("/");
        }
    }, [accessToken, navigate]); //пока не делаю нужен токен, тут будет переход

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        errorFunc();
        const target = event.target as typeof event.target & LoginForm; //тип значений которые мы вытаскиваем
        const { email, password } = target; //отправляем данные туда
        await login({ email: email.value, password: password.value });
        if (error){toast.error('Неверно введенные данные', {position: 'bottom-right'})}
    };

    const [checked, setChecked] = useState(false); //изначально галки нет
    const chengeCheckbox = () => {
        setChecked(!checked);
    }; //тут чек обработки данных

    return (
        <div className={styles["auth"]}>
            <h1>Вход</h1>
            <form className={styles["form"]} onSubmit={submit}>
                <div className={styles["form_logo"]}>
                    <label htmlFor="email">Email</label>
                    <Input
                        type="text"
                        id="email"
                        placeholder="...@mail.ru"
                        name="email"
                        autoComplete="off"
                    />
                </div>
                <div className={styles["form_logo"]}>
                    <label htmlFor="Password">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        autoComplete="off"
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
            <ToastContainer />
        </div>
    );
}
