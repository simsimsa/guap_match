import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./register.module.css";
import Input from "../../components/Input/Input";
import { FormEvent, useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.state";
import { toast, ToastContainer } from "react-toastify";

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

    useEffect(() => {
        if (accessToken && !error && checked) {
            navigate("/form");
        }
    }, [accessToken, navigate]); //пока не делаю нужен токен, тут будет переход

    const errorFunc = () => {
        if (checked == false) {
            toast.error("Подтвердите согласие на обработку данных", {
                position: "bottom-right",
                className: styles["error"],
            });
        }
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        errorFunc();
        const target = event.target as typeof event.target & RegisterForm; //тип значений которые мы вытаскиваем
        const { name, email, password } = target; //отправляем данные туда
        // register({ emailReg, passwordReg });
        await register({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        if (error) {
            toast.error("Неправильно введенные данные", {
                position: "bottom-right",
                className: styles["error"],
            });
        }
    };

    const [checked, setChecked] = useState(false);
    const chengeCheckbox = () => {
        setChecked(!checked);
    };

    return (
        <div className={styles["auth"]}>
            <h1>Регистрация</h1>
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
            <ToastContainer />
        </div>
    );
}
