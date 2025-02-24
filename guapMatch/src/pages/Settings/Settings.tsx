import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Settings.module.css";

export function Settings() {
    const navigate = useNavigate();

    return (
        <div className={styles["label"]}>
            <div className={styles["label_settings"]}>
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
                        defaultValue={"Тестовый юзер"} //в таких полях будут значения с бэка
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
                        defaultValue={"19"}
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
                        defaultValue={"Информатика и вычислительная техника"}
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
                        defaultValue={"2"}
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
                        defaultValue={"Общежитие №2"}
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
                        defaultValue={"Сыктывкар"}
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
                        defaultValue={"Тут информация о себе"}
                    />
                </div>
            </div>
            <Button onClick={() => navigate("/Profile")}>Редактировать</Button>
        </div>
    );
}
