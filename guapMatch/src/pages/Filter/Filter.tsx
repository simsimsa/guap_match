import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Filter.module.css";
import cn from "classnames";

export function Filter() {
    const [gender, setgender] = useState("left");

    return (
        <form className={styles["form"]}>
            <div className={styles["Filter_header"]}>
                <div className={styles["filterH1"]}>Filters</div>
                <button
                    className={styles["Clear"]}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
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
                <Input type="text" id="location" name="location" />
            </div>
            <div className={styles["filterInput"]}>
                <label htmlFor="course">Course</label>
                <Input type="text" id="course" name="course" />
            </div>
            <Button>Continue</Button>
        </form>
    );
}

//понять как передавать родителю состояние нажатия кнопки чтобы в родительский элемент шел хидден вместо перезагрузки страницы
