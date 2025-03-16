import { useEffect, useState } from "react";
import styles from "./User.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.state";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const testImg = [
    "./test1.jpg",
    "./roma.jpg",
    "./test3.jpg",
    "./test2.jpg",
    "./test4.jpg",
    "test5.jpg",
];

export function User() {
    const { getProfile, accessToken, user, isLoading } = useAuthStore();
    const [seephotos, setSeephotos] = useState("See all");
    const [appear, setappear] = useState(true);
    const [numberImg, setnumberImg] = useState(-1);
    const [edit, setedit] = useState(false);
    const [addDisplay, setaddDisplay] = useState(false);

    useEffect(() => {
        if (accessToken) {
            getProfile(accessToken);
        }
    }, [accessToken]);

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
            <div
                className={cn(styles["addDisplay"], {
                    [styles["hidden"]]: addDisplay === false,
                })}
            >
                <div className={styles["display"]}>
                    <button
                        className={styles["cross_img_label"]}
                        onClick={() => setaddDisplay(false)}
                    >
                        <img src="./cross.svg" alt="" />
                    </button>
                    <div className={styles["main"]}>
                        <div className={styles["header"]}>
                            Вы точно хотите удалить фотографию?
                        </div>
                        <div>
                            <button
                                className={styles["yes"]}
                                onClick={() => setaddDisplay(false)} //тут будет функция для бэка и удаления фотографии
                            >
                                Да
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["user_head"]}>
                 {isLoading ? <Skeleton width={300} height={300}/> :<div
                    className={styles["user_photo"]}
                    style={{ backgroundImage: `url(./ava_test.jpg)` }}
                >
                    <button className={styles["img_new"]}>
                        <img src="./loading.svg" alt="" />
                    </button>
                </div>}
                <div className={styles["user_info"]}>
                    <div className={styles["user_header"]}>
                        <div className={styles["user_main"]}>
                            <div className={styles["user_name"]}>
                                {isLoading ? <Skeleton /> : `${user?.name},`}
                            </div>

                            <div className={styles["user_age"]}>
                                {isLoading ? <Skeleton /> : `${user?.age} лет`}
                            </div>
                        </div>
                        <Link to="/Settings" className={styles["settings"]}>
                            <img src="./settings.svg" />
                        </Link>
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
            <div className={styles["user_body"]}>
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
                    <button
                        onClick={() => setedit(true)}
                        className={cn(styles["edit_gallery"], {
                            [styles["hidden"]]:
                                seephotos == "Close" || edit === true,
                        })}
                    >
                        <img src="./edit_gallery.svg" alt="" />
                    </button>
                    <label
                        htmlFor="addgallerry"
                        className={cn(styles["edit_gallery"], {
                            [styles["hidden"]]: edit === false,
                        })}
                    >
                        <img src="./add_gallery.svg" alt="" />\
                    </label>
                    <input
                        type="file"
                        name="addgallerry"
                        id="addgallerry"
                        className={styles["hidden"]}
                        accept="image/*"
                    />

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
                                {isLoading ? <Skeleton height={300}/> :<img
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
                                <button
                                    className={cn(styles["cross_img"], {
                                        [styles["hidden"]]: edit === false,
                                    })}
                                >
                                    <img
                                        src="./cross.svg"
                                        alt=""
                                        onClick={() => setaddDisplay(true)}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
