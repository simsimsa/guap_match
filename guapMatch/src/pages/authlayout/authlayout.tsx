import { Outlet } from "react-router-dom";
import styles from "./authlayout.module.css";

export function AuthLayout() {
    return (
        <div className={styles["auth_layout"]}>
            <div className={styles["img_heart"]}>
                <img src="/love_heart.svg" alt="задний фон сердце" />
            </div>
            <div className={styles["content"]}>
                <Outlet />
            </div>
        </div>
    );
}
