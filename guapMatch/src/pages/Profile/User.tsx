import styles from "./User.module.css";

export function User() {
    return (
        <div className={styles["user_layout"]}>
            <div className={styles["user_head"]}>
                <div
                    className={styles["user_photo"]}
                    style={{ backgroundImage: `url(./ava_test.jpg)` }}
                >
                    <button className={styles["img_new"]}>
                        <img src="./loading.svg" alt="" />
                    </button>
                </div>
                <div className={styles["user_info"]}>
                    <div className={styles["user_header"]}>
                        <div className={styles["user_main"]}>
                            <div className={styles["user_name"]}>
                                Тестовый юзер
                            </div>
                            <div className={styles["user_age"]}>21</div>
                        </div>
                        <button className={styles["settings"]}>
                            <img src="./settings.svg" />
                        </button>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>
                            Информатика и вычислительная техника
                        </div>
                        <div className={styles["text_kategory"]}>2 курс</div>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>Место проживания</div>
                        <div className={styles["text_kategory"]}>
                            Общежитие №2
                        </div>
                    </div>
                    <div className={styles["kategory"]}>
                        <div className={styles["title"]}>Родной город</div>
                        <div className={styles["text_kategory"]}>Сыктывкар</div>
                    </div>
                </div>
            </div>
            <div className={styles["user_body"]}>
                <div className={styles["title"]}>О себе</div>
                <div className={styles["text_kategory"]}>
                    Здесь будет о себе
                </div>
            </div>
            <div className={styles['user_body']}>
                <div className={styles['user_gallery']}>
                    <div>Gallery</div>
                    <div>Тут будет ссылка</div>
                </div>
                <div>Тут будут все загруженные фотографии</div>
            </div>
        </div>
    );
}
