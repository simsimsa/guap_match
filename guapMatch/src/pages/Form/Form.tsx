import { FormEvent, SetStateAction, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export type Form = {
    age: {
        value: string;
    };
    course: {
        value: string;
    };
    avatar: {
        value: string;
    };
};

export function Form() {
    const navigate = useNavigate();
    const [textt, settextt] = useState("Прикрепить фото");
    const [value, setvalue] = useState("woman"); //для чекаута пола
    const [error, seterror] = useState("");
    //Функция для смены чекаута пола
    function chek(event: { target: { value: SetStateAction<string> } }) {
        setvalue(event.target.value);
    }

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        seterror("");
        const target = event.target as typeof event.target & Form;
        const { age, course, avatar } = target;
        const ava: string = avatar.value.toString();//отдельная функция для бэка, где передается изображение а возвращается юрл
        console.log(age.value, course.value, ava); //ТУТ ВОЗНИКЛИ СЛОЖНОСТИ НАДО РАСПАРСИТЬ ФАЙЛ КАК ТО ОН НЕ ПЕРЕДАЕТСЯ
        await sendLogin(age.value, course.value, ava);
    };

    const sendLogin = async (age: string, course: string, ava: string) => {
        if (
            age !== "" &&
            course !== "" &&!ava//тут ошибка все еще не понимаю как фотку отдать
            /*textt !== "Прикрепить фото"*/ 
        ) {
            localStorage.setItem(age, course);
            console.log("все заебись");
            navigate("/");
        } else {
            seterror("Что-то не так! Ошибка от руса");
        }
    };

    return (
        <div className={styles["layout"]}>
            <div
                className={styles["to_vibe"]}
            >
                <h1 className={styles["h1"]}>Заполни анкету</h1>
                <div className={styles["goCommunicate"]}>
                    и переходи к общению!
                </div>
                {error !== "" && <div className={styles["error"]}>{error}</div>}
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
                        <label htmlFor="aboutYou">О себе:</label>
                        <textarea
                            name="aboutYou"
                            id="aboutYou"
                            rows={3}
                            cols={50}
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
                                settextt("Спасибо за загрузку!");
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
        </div>
    );
}
