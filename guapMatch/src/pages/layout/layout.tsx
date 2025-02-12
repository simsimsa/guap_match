import { NavLink, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import cn from "classnames";

export function Layout() {

    return (
        <div className={styles["layout"]}>
            <div className={styles["menu_layout"]}>
                <div className={styles["navigate"]}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles["goTo"], { [styles.active]: isActive })
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/Svap"
                        className={({ isActive }) =>
                            cn(styles["goTo"], { [styles.active]: isActive })
                        }
                    >
                        Svap
                    </NavLink>
                    <NavLink
                        to="/Messages"
                        className={({ isActive }) =>
                            cn(styles["goTo"], { [styles.active]: isActive })
                        }
                    >
                        Messages
                    </NavLink>
                    <NavLink
                        to="/Profile"
                        className={({ isActive }) =>
                            cn(styles["goTo"], { [styles.active]: isActive })
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
