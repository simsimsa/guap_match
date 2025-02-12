import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Profile.module.css'

export function Profile(){

    const navigate = useNavigate();

    const exit = () => {
        //как будет бэк добавлю реализацию выхода через токен
        navigate("/auth/login");
    };
    
    return (
        <div>
            Тут будет профиль
            <div className={styles["exit"]}>
                <Button
                    className={styles["small"]}
                    appear="small"
                    onClick={exit}
                >
                    Выйти
                </Button>
            </div>
        </div>
    );
}