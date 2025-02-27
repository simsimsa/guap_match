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
                        to="/Match"
                        className={({ isActive }) =>
                            cn(styles["goTo"], { [styles.active]: isActive })
                        }
                    >
                        Match
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
            <div className={styles['outlet']}>
                <Outlet />
            </div>
        </div>
    );
}
