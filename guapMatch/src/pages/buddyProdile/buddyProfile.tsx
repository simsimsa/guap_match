import { useState } from "react";
import styles from "./buddyProfile.module.css";
import cn from "classnames";
import { useAuthStore } from "../../store/auth.state";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const testImg = [
    "./test1.jpg",
    "./roma.jpg",
    "./test3.jpg",
    "./test2.jpg",
    "./test4.jpg",
];

export function Buddy() {
    const { user, isLoading } = useAuthStore();
    const [seephotos, setSeephotos] = useState("See all");
    const [numberImg, setnumberImg] = useState(-1);
    const [edit, setedit] = useState(false);
    const [appear, setappear] = useState(true);

    const SeeAll = () => {
        if (seephotos == "See all") {
            setSeephotos("Close");
            setappear(false);
        } else {
            setSeephotos("See all");
            setappear(true);
        }
    };

    const handleImageClick = (index: number) => {
        if (numberImg === index) {
            setnumberImg(-1);
        } else {
            setnumberImg(index);
        }
    };

    return (
        <div className={styles["user_layout"]}>
            <div className={styles["user_head"]}>
                <Link to="/Chatroom" className={styles["backToMessages"]}>
                    <img src="./backtomessages.svg" alt="" />
                </Link>
                {isLoading ? <Skeleton width={300} height={300}/> :<div
                    className={styles["user_photo"]}
                    style={{ backgroundImage: `url(./ava_test.jpg)` }}
                />}
                <div className={styles["user_info"]}>
                    <div className={styles["user_header"]}>
                        <div className={styles["user_main"]}>
                            <div className={styles["user_name"]}>
                                {isLoading ? <Skeleton width={90}/> : `${user?.name},`}
                            </div>
                            <div className={styles["user_age"]}>
                                {isLoading ? <Skeleton width={50} /> : `${user?.age} лет`}
                            </div>
                        </div>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>{isLoading ? <Skeleton/> :user?.napravl}</div>
                        <div className={styles["text_kategory"]}>
                            {isLoading ? <Skeleton /> : `${user?.course} курс`}
                        </div>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>Место проживания</div>
                        <div className={styles["text_kategory"]}>
                            {isLoading ? <Skeleton /> : user?.life}
                        </div>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>Родной город</div>
                        <div className={styles["text_kategory"]}>
                            {isLoading ? <Skeleton /> : user?.home}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["text_body"]}>
                <div className={styles["title"]}>О себе</div>
                <div className={styles["text_kategory"]}>
                    {isLoading ? <Skeleton /> : user?.aboutYou}
                </div>
            </div>
            <div className={styles["user_body"]}>
                <div className={styles["user_gallery"]}>
                    <div>Gallery</div>
                    <button
                        onClick={SeeAll}
                        className={cn(styles["all_photos"], {
                            [styles["hidden"]]: edit === true,
                        })}
                    >
                        {seephotos}
                    </button>
                    <button
                        onClick={() => setedit(false)}
                        className={cn(styles["all_photos"], {
                            [styles["hidden"]]: edit === false,
                        })}
                    >
                        Edit
                    </button>
                </div>
                <div
                    className={cn(styles["gallery_img"], {
                        [styles["hidden_gallery"]]: appear && edit === false,
                    })}
                >
                    {testImg.map((photo, index) => {
                        return (
                            <div
                                style={{
                                    order: numberImg === index ? 0 : 1,
                                }}
                                className={cn(
                                    {
                                        [styles["big_image_container"]]:
                                            numberImg === index &&
                                            seephotos == "Close",
                                    },
                                    styles["photo_container"]
                                )}
                                key={index}
                            >
                                {isLoading ? <Skeleton height={300}/> : <img
                                    src={photo}
                                    className={cn(styles["photo_user"], {
                                        [styles["big_image"]]:
                                            numberImg == index &&
                                            seephotos == "Close" &&
                                            edit === false,
                                    })}
                                    onClick={() => {
                                        handleImageClick(index);
                                    }}
                                />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
