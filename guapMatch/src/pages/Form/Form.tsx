import { FormEvent, SetStateAction, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export type Form = {
    age: {
        value: string;
    };
    course: {
        value: string;
    };
    avatar: {
        value: File;
    };
    napravl: {
        value: string;
    };
    life: {
        value: string;
    };
    home: {
        value: string;
    };
};

export function Form() {
    const navigate = useNavigate();
    const [textt, settextt] = useState("Загрузить аватар");
    const [value, setvalue] = useState("woman"); //для чекаута пола

    const errorFunc = () => {
        toast.warning("Заполните все поля анкеты", {
            position: "bottom-right",
            className: "error",
        });
    };

    //Функция для смены чекаута пола
    function chek(event: { target: { value: SetStateAction<string> } }) {
        setvalue(event.target.value);
    }

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & Form;
        const { age, course, avatar, napravl, life, home } = target;
        //const ava: string = avatar.value.toString(); //отдельная функция для бэка, где передается изображение а возвращается юрл
        console.log(age.value, course.value, avatar.value); //ТУТ ВОЗНИКЛИ СЛОЖНОСТИ
        //await sendLogin(age.value, course.value, avatar.value); //тут будет функция на бэк
        if (
            !age.value.trim() &&
            !course.value.trim() &&
            !napravl.value.trim() &&
            !life.value.trim() &&
            !home.value.trim()
        ) {
            errorFunc();
        } else {
            navigate("/");
        }
    };

    /*const sendLogin = async (age: string, course: string, ava: File) => {
        if (
            age !== "" &&
            course !== "" &&
            !ava 
        ) {
            localStorage.setItem(age, course);
            console.log("все заебись");
            navigate("/");
        } 
    };*/
    //строки выше будут не нужны, все через zustand

    return (
        <div className={styles["layout"]}>
            <div className={styles["to_vibe"]}>
                <h1 className={styles["h1"]}>Заполни анкету</h1>
                <div className={styles["goCommunicate"]}>
                    и переходи к общению!
                </div>
                <form className={styles["profile"]} onSubmit={submit}>
                    <div className={styles["profile_gender"]}>
                        <legend>Пол:</legend>
                        <div className={styles["gender"]}>
                            <input
                                type="radio"
                                id="woman"
                                name="gender"
                                value="woman"
                                checked={value === "woman" ? true : false}
                                onChange={chek}
                            />
                            <label htmlFor="woman">Девушка</label>
                        </div>
                        <div className={styles["gender"]}>
                            <input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                checked={value === "man" ? true : false}
                                onChange={chek}
                            />
                            <label htmlFor="man">Парень</label>
                        </div>
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="age">Возраст:</label>
                        <Input
                            type="text"
                            id="age"
                            name="age"
                            placeholder="Введите ваш возраст"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="napravl">Направление:</label>
                        <Input
                            type="text"
                            id="napravl"
                            name="napravl"
                            placeholder="Введите ваше направление"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="course">Курс:</label>
                        <Input
                            type="text"
                            id="course"
                            name="course"
                            placeholder="Введите ваш курс"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="life">Место проживания:</label>
                        <Input
                            type="text"
                            id="life"
                            name="life"
                            placeholder="Введите место своего проживания"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="home">Родной город:</label>
                        <Input
                            type="text"
                            id="home"
                            name="home"
                            placeholder="Введите родной город"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_div"]}>
                        <label htmlFor="aboutYou">О себе:</label>
                        <textarea
                            name="aboutYou"
                            id="aboutYou"
                            rows={3}
                            cols={50}
                            placeholder="Расскажите немного о себе"
                            className={styles["textarea"]}
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles["profile_img"]}>
                        <label
                            htmlFor="avatar"
                            className={styles["avatar"]}
                            onClick={(e) => {
                                console.log(e);
                                settextt("Аватар загружен!");
                            }}
                        >
                            {textt}
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            autoComplete="off"
                            value=""
                            className={styles["hidden"]}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles["button"]}>
                        <Button>Отправить</Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
