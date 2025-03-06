import { Link } from "react-router-dom";
import styles from "./Chat.module.css";

interface ChatProps {
    avatar: string;
    avtor: string;
    message: string;
    time: string;
}

function Chat({ avatar, avtor, message, time }: ChatProps) {
    return (
        <div className={styles["chatLayout"]}>
            <div className={styles["chat"]}>
                <div>
                    <img
                        className={styles["avatar"]}
                        src={avatar}
                        alt="Аватар"
                    />
                </div>
                <Link to="/Chatroom" className={styles["body"]}>
                    <div className={styles["chatHead"]}>
                        <div className={styles["avtor"]}>{avtor}</div>
                        <div className={styles["time"]}>{time}</div>
                    </div>
                    <div className={styles["message"]}>{message}</div>
                </Link>
            </div>
            <hr className={styles["hrChat"]} />
        </div>
    );
}

export default Chat;
