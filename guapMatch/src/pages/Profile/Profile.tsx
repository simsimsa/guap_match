import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.css";
import { useAuthStore } from "../../store/auth.state";
import { User } from "./User";

export function Profile() {
    const { logout, accessToken } = useAuthStore();

    const navigate = useNavigate();

    const exit = () => {
        logout(accessToken);
        navigate("/auth/login");
    };

    return (
        <div className={styles["profile_layout"]}>
            <User />
            <div className={styles["exit"]}>
                <Button onClick={exit}>Выйти</Button>
            </div>
        </div>
    );
}
