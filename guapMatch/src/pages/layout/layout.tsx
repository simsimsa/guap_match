import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.css";
import cn from "classnames";

export function Layout() {
    const location = useLocation();

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
                        Svap
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
                            cn(styles["goTo"], {
                                [styles.active]:
                                    isActive ||
                                    location.pathname === "/Chatroom" ||
                                    location.pathname=="/Buddy",
                            })
                        }
                    >
                        Messages
                    </NavLink>
                    <NavLink
                        to="/Profile"
                        className={({ isActive }) =>
                            cn(styles["goTo"], {
                                [styles.active]:
                                    isActive ||
                                    location.pathname === "/Settings",
                            })
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            </div>
            <div className={styles["outlet"]}>
                <Outlet />
            </div>
        </div>
    );
}
