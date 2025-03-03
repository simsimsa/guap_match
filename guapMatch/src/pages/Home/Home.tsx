import { useState } from "react";
import styles from "./Home.module.css";
import cn from "classnames";
import { Outlet } from "react-router-dom";

export function Home() {
    const [filtr, setfiltr] = useState(false);

    const random = () => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            console.log("Yes");
        } else {
            console.log("No");
        }
    }; //Тут доработается с бэком

    return (
        <div className={styles["svapLayout"]}>
            <div className={styles["svap"]}>
                <button
                    className={styles["filter"]}
                    onClick={() => {
                        setfiltr(true);
                    }}
                >
                    <img src="./sort-two.svg" alt="" />
                </button>
                <div className={styles["svapHeader"]}>
                    <h1 className={styles["svapH1"]}>Svap</h1>
                    <div className={styles["svapHeaderBody"]}>
                        This is a page where you can find interesting people to
                        chat with.
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url(/test2.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "440px",
                        height: "440px",
                    }}
                    className={styles["after-container"]}
                >
                    <div
                        style={{
                            backgroundImage: `url(/test1.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "460px",
                            height: "460px",
                        }}
                        className={styles["container"]}
                    >
                        <div className={styles["location"]}>
                            {" "}
                            <img src="./local-two.svg" alt="" />
                            <div>Общажка</div>
                        </div>
                        <div className={styles["svapInfo"]}>
                            <div className={styles["svapInfoHeader"]}>
                                <div>Ксюша, </div>
                                <div>19 лет</div>
                            </div>
                            <div className={styles["svapInfoBody"]}>
                                <div>ИВТ, </div>
                                <div>2 курс</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["svapChoise"]}>
                    <button className={styles["choiseDislike"]}>
                        <img src="./dislike.svg" alt="" />
                    </button>
                    <button className={styles["svapRandom"]} onClick={random}>
                        Random
                    </button>
                    <button className={styles["choiseLike"]}>
                        <img src="./likesvap.svg" alt="" />
                    </button>
                </div>
                <div
                    className={cn(styles["filter_display"], {
                        [styles["hidden"]]: filtr === false,
                    })}
                >
                    <Outlet context={setfiltr} />
                </div>
            </div>
        </div>
    );
}
