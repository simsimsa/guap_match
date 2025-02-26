import { Link, useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Settings.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.state";

export type Form = {
    name: {
        value: string;
    };
    age: {
        value: number;
    };
    course: {
        value: string;
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

export function Settings() {
    const [clicked, setclicked] = useState(false)
    const { updateProfile, getProfile, accessToken, user, error } =
        useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (error == null && clicked) {
            navigate("/Profile");
        }
    }, [error, navigate, clicked]);

    useEffect(() => {
        if (accessToken) {
            getProfile(accessToken);
        }
    }, [accessToken]);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & Form;
        const { name, age, course, napravl, life, home, aboutYou } = target;
        console.log(
            name.value,
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
                name: name.value,
                age: Number(age.value),
                napravl: napravl.value,
                course: course.value,
                life: life.value,
                home: home.value,
                aboutYou: aboutYou.value,
            });
        }
        console.log(name.value)
        console.log(error);
    };

    return (
        <div className={styles["label"]}>
            <form className={styles["label_settings"]} onSubmit={submit}>
                <div className={styles["header"]}>
                    <h2 className={styles["h2"]}>Отредактируйте данные</h2>
                    <Link to="/Profile" className={styles["profile"]}>
                        <img src="/cross.svg" />
                    </Link>
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="name">Имя:</label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ваше имя"
                        autoComplete="off"
                        defaultValue={user?.name} //в таких полях будут значения с бэка
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="age">Возраст:</label>
                    <Input
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Ваш возраст"
                        autoComplete="off"
                        defaultValue={user?.age}
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="napravl">Направление:</label>
                    <Input
                        type="text"
                        id="napravl"
                        name="napravl"
                        placeholder="Ваше направление"
                        autoComplete="off"
                        defaultValue={user?.napravl}
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="course">Курс:</label>
                    <Input
                        type="text"
                        id="course"
                        name="course"
                        placeholder="Ваш курс"
                        autoComplete="off"
                        defaultValue={user?.course}
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="life">Место проживания:</label>
                    <Input
                        type="text"
                        id="life"
                        name="life"
                        placeholder="Место вашего проживания"
                        autoComplete="off"
                        defaultValue={user?.life}
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="home">Родной город:</label>
                    <Input
                        type="text"
                        id="home"
                        name="home"
                        placeholder="Ваш родной город"
                        autoComplete="off"
                        defaultValue={user?.home}
                    />
                </div>
                <div className={styles["profile_div"]}>
                    <label htmlFor="aboutYou">О себе:</label>
                    <textarea
                        name="aboutYou"
                        id="aboutYou"
                        rows={3}
                        cols={50}
                        placeholder="О себе"
                        className={styles["textarea"]}
                        autoComplete="off"
                        defaultValue={user?.aboutYou}
                    />
                </div>
                <Button onClick={()=>{setclicked(true)}}>
                    Редактировать
                </Button>
            </form>
        </div>
    );
}
