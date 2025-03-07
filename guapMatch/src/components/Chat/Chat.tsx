import { Link } from "react-router-dom";
import styles from "./Chat.module.css";
import { useChatStore } from "../../store/auth.state";

interface ChatProps {
    id: number,
    avatar: string;
    avtor: string;
    message: string;
    time: string;
}

function Chat({ id, avatar, avtor, message, time }: ChatProps) {

    const { selectChat } = useChatStore(); // Доступ к хранилищу

    // Обработчик клика по чату
    const handleChatClick = () => {
        const chat = { id, avatar, avtor, message, time }; // Создаем объект чата
        selectChat(chat); // Сохраняем выбранный чат в хранилище
    };

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
                <Link to='/Chatroom' className={styles["body"]} onClick={handleChatClick}>
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
