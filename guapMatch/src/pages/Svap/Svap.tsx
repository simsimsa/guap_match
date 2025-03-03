import { Outlet } from "react-router-dom";
import styles from "./Svap.module.css";
import { useState } from "react";
import cn from "classnames";

const testImg = [
    "./test1.jpg",
    "./roma.jpg",
    "./test3.jpg",
    "./test2.jpg",
    "./test4.jpg",
    "test5.jpg",
];

export function Match() {
    const [filtr, setfiltr] = useState(false);

    return (
        <div className={styles["MatchLayout"]}>
            <div className={styles["Match"]}>
                <button className={styles["filter"]} onClick={()=>{setfiltr(true)}}>
                    <img src="./sort-two.svg" alt="" />
                </button>
                <div className={styles["Match_header"]}>
                    <h2 className={styles["match_h1"]}>Matches</h2>
                    <div className={styles["match_header_body"]}>
                        This is a list of people who have liked you and your
                        matches.
                    </div>
                </div>
                <div className={styles["hrIn"]}>
                    <hr className={styles["hr_line"]} />
                    <div className={styles["textInHr"]}>Today</div>
                </div>
                <div className={styles["matchBody"]}>
                    <div className={styles["gallery_img"]}>
                        {testImg.map((photo, index) => {
                            return (
                                <div
                                    className={styles["photo_container"]}
                                    key={index}
                                >
                                    <img
                                        src={photo}
                                        className={styles["photo_user"]}
                                    />
                                    <div className={styles["matchUserInfo"]}>
                                        <div
                                            className={
                                                styles["matchInfoHeader"]
                                            }
                                        >
                                            <div>UserName</div>
                                            <div>UserAge</div>
                                        </div>
                                        <div className={styles["YesOrNo"]}>
                                            <button
                                                className={styles["MatchYes"]}
                                            >
                                                <img src="./like.svg" alt="" />
                                            </button>
                                            <button
                                                className={styles["MatchNo"]}
                                            >
                                                <img
                                                    src="./close-small.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles["hrIn"]}>
                    <hr className={styles["hr_line"]} />
                    <div className={styles["textInHr"]}>Before</div>
                </div>
                <div
                    className={cn(styles["filter_display"], {
                        [styles["hidden"]]: filtr === false,
                    })}
                >
                    <Outlet context={setfiltr}/>
                </div>
            </div>
        </div>
    );
}
