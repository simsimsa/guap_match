import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/carousel";
import styles from "./Main.module.css";

const images = [
    { img: "/cat_match_1.svg", text: "Знакомимся" },
    { img: "/catsTolking.svg", text: "Общаемся" },
    { img: "/cattolking_1.svg", text: "Встречаемся" },
    { img: "/catsTolking.svg", text: "Любимся" },
];

export function Cover() {
    return (
        <div className={styles["main"]}>
            <Carousel images={images} />
            <div className={styles["link"]}>
                <div className={styles["text"]}>Учишься в ГУАПе?</div>
                <Link to="/auth/login" className={styles["register"]}>
                    Присоединяйся!
                </Link>
            </div>
        </div>
    );
}
