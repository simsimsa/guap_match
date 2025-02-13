import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./register.module.css";
import Input from "../../components/Input/Input";
import { FormEvent, useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.state";

export type RegisterForm = {
    name: {
        value: string;
    };
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Register() {
    const navigate = useNavigate();
    const { register, accessToken, error } = useAuthStore();
    const [err, seterror] = useState("");

    useEffect(() => {
        if (accessToken) {
            navigate("/form");
        }
    }, [accessToken, navigate]); //пока не делаю нужен токен, тут будет переход

    const myError = () => {
        seterror("Ошибка от Руса"); //тут моя ошибка улучшится
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        seterror("");
        const target = event.target as typeof event.target & RegisterForm; //тип значений которые мы вытаскиваем
        const { name, email, password } = target; //отправляем данные туда
        if (!email.value || !password.value || !name.value || checked == false) {
            myError();
        }
        await sendLogin(name.value, email.value, password.value); //отправляем функцию для отправки на бэк
    };

    const sendLogin = async (name: string, email: string, password: string) => {
        try {
            await register({ name, email, password });
        } catch (error) {
            myError();
            console.error(error); //тут будет ошибка от руса
        }
    };

    const [checked, setChecked] = useState(false);
    const chengeCheckbox = () => {
        setChecked(!checked);
    };

    return (
        <div className={styles["auth"]}>
            <h1>Регистрация</h1>
            {(err !== "" || error!==null)&& <div className={styles["error"]}>{err}</div>}
            <form className={styles["form"]} onSubmit={submit}>
                <div className={styles["form_logo"]}>
                    <label htmlFor="name">Имя</label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Введите свое имя"
                        name="name"
                        autoComplete="off"
                    />
                </div>
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
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="none"
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
                <Button /*isLoading={isLoading}*/>Зарегестрироваться</Button>
            </form>
            <div className={styles["link_register"]}>
                <div>Уже есть аккаунт?</div>
                <Link to="/auth/login" className={styles["register"]}>
                    Войти!
                </Link>
            </div>
        </div>
    );
}
