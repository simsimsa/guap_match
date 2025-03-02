import { FormEvent, SetStateAction, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../../store/auth.state";

export type Form = {
    gender: {
        value: "FEMALE" | "MALE";
    };
    age: {
        value: number;
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
    aboutYou: {
        value: string;
    };
};

export function Form() {
    const { updateProfile, accessToken, error, user } = useAuthStore();
    const navigate = useNavigate();
    const [textt, settextt] = useState("Загрузить аватар");
    const [value, setvalue] = useState("FEMALE"); //для чекаута пола

    const errorFunc = () => {
        toast.warning("Заполните все поля анкеты", {
            position: "bottom-right",
            className: "error",
        });
    };

    useEffect(() => {
        if (!error && user?.age) {
            navigate("/Profile");
        }
    }, [error, user, navigate]);

    //Функция для смены чекаута пола
    function chek(event: { target: { value: SetStateAction<string> } }) {
        setvalue(event.target.value);
    }

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & Form;
        const { gender, age, course, napravl, life, home, aboutYou } = target;
        console.log(
            gender.value,
            age.value,
            napravl.value,
            course.value,
            life.value,
            home.value,
            aboutYou.value,
            typeof age.value
        );
        if (accessToken) {
            updateProfile(accessToken, {
                gender: gender.value,
                age: Number(age.value),
                napravl: napravl.value,
                course: course.value,
                life: life.value,
                home: home.value,
                aboutYou: aboutYou.value,
            });
        }
        if (
            !age.value &&
            !course.value.trim() &&
            !napravl.value.trim() &&
            !life.value.trim() &&
            !home.value.trim()
        ) {
            errorFunc();
        }
    };

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
                                required
                                type="radio"
                                id="FEMALE"
                                name="gender"
                                value="FEMALE"
                                checked={value === "FEMALE" ? true : false}
                                onChange={chek}
                            />
                            <label htmlFor="FEMALE">Девушка</label>
                        </div>
                        <div className={styles["gender"]}>
                            <input
                                type="radio"
                                id="MALE"
                                name="gender"
                                value="MALE"
                                checked={value === "MALE" ? true : false}
                                onChange={chek}
                            />
                            <label htmlFor="MALE">Парень</label>
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
