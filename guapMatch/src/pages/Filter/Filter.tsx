import { FormEvent, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Filter.module.css";
import cn from "classnames";
import { useOutletContext } from "react-router-dom";

export function Filter() {
    const [gender, setgender] = useState("left");
    const locationRef = useRef<HTMLInputElement>(null);
    const courseRef = useRef<HTMLInputElement>(null);
    const setfiltr =
        useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

    const clearFunction = (e: FormEvent) => {
        e.preventDefault();
        setgender("left");

        // Очистка полей ввода
        if (locationRef.current) locationRef.current.value = "";
        if (courseRef.current) courseRef.current.value = "";
    };

    return (
        <form className={styles["form"]}>
            <div className={styles["Filter_header"]}>
                <div className={styles["filterH1"]}>Filters</div>
                <button className={styles["Clear"]} onClick={clearFunction}>
                    Clear
                </button>
            </div>
            <div className={styles["filterBody"]}>
                <div className={styles["filterInteres"]}>Interested in</div>
                <div className={styles["gender"]}>
                    <button
                        className={cn(styles["genderButtonLeft"], {
                            [styles["active"]]: gender === "left",
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            setgender("left");
                        }}
                    >
                        Girls
                    </button>
                    <button
                        className={cn(styles["genderButtonCenter"], {
                            [styles["active"]]: gender === "center",
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            setgender("center");
                        }}
                    >
                        Boys
                    </button>
                    <button
                        className={cn(styles["genderButtonRight"], {
                            [styles["active"]]: gender === "right",
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            setgender("right");
                        }}
                    >
                        All
                    </button>
                </div>
            </div>
            <div className={styles["filterInput"]}>
                <label htmlFor="location">Location</label>
                <Input
                    type="text"
                    id="location"
                    name="location"
                    autoComplete="off"
                    ref={locationRef}
                />
            </div>
            <div className={styles["filterInput"]}>
                <label htmlFor="course">Course</label>
                <Input
                    type="text"
                    id="course"
                    name="course"
                    autoComplete="off"
                    ref={courseRef}
                />
            </div>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    setfiltr(false);
                    clearFunction(e);
                }}
            >
                Continue
            </Button>
        </form>
    );
}

//понять как передавать родителю состояние нажатия кнопки чтобы в родительский элемент шел хидден вместо перезагрузки страницы
