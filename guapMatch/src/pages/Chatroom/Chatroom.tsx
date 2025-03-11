/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { useChatStore } from "../../store/auth.state";
import styles from "./Chatroom.module.css";
import Search from "../../components/Search/Search";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../components/Input/Input";
import Sms from "../../components/Sms/Sms";

export type MessageForm = {
    message: {
        value: string;
    };
};

export type messagesSms = {
    from: "buddy" | "you";
    text: string;
    time: string;
};

const messages: Array<messagesSms> = [
    {
        from: "buddy",
        text: "hello",
        time: "14:54",
    },
    {
        from: "buddy",
        text: "How are you?",
        time: "14:54",
    },
    {
        from: "you",
        text: "Hi",
        time: "14:56",
    },
];

export function Chatroom() {
    const [filter, setFilter] = useState<string>("");
    const messageRef = useRef<HTMLDivElement>(null);
    const [messag, setmessag] = useState(messages);
    const [filteredMessages, setFilteredMessages] = useState(messages);
    const { selectedChat } = useChatStore(); // Доступ к выбранному чату

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messag]);

    if (!selectedChat) {
        return <div>Чат не выбран</div>;
    }

    useEffect(() => {
        const filteredChats = messages.filter((message) =>
            message.text.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredMessages(filteredChats);
    }, [filter]);

    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & MessageForm;
        const { message } = target;
        if (message.value.trim() != "") {
            console.log(message.value);

            const newMessag: messagesSms = {
                from: "you",
                text: message.value,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setmessag([...messag, newMessag]);
            setFilteredMessages([...filteredMessages, newMessag]);
        }
        message.value = "";
    };

    return (
        <div className={styles["chatroomLayout"]}>
            <div className={styles["chatroom"]}>
                <div className={styles["chatroomHeader"]}>
                    <div className={styles["chatroomHead"]}>
                        <Link
                            to="/Messages"
                            className={styles["backToMessages"]}
                            //onClick={exitinchat}
                        >
                            <img src="./backtomessages.svg" alt="" />
                        </Link>
                        <Link to="/Buddy" className={styles["avtor"]}>
                            <img
                                className={styles["avatar"]}
                                src={selectedChat.avatar}
                                alt={selectedChat.avtor}
                            />
                            <h1 className={styles["chatroomH1"]}>
                                {selectedChat.avtor}
                            </h1>
                        </Link>
                    </div>
                    <Search placeholder="Поиск..." onChange={updateFilter} />
                </div>
                <div className={styles["chatroomContainer"]}>
                    <div className={styles["smsContainer"]}>
                        <Sms
                            key={selectedChat.avtor}
                            from={"you"}
                            text={selectedChat.message}
                            time={selectedChat.time}
                        />
                        {filteredMessages.map((message, index) => (
                            <Sms
                                key={index}
                                from={message.from}
                                text={message.text}
                                time={message.time}
                            />
                        ))}
                        <div ref={messageRef} />
                    </div>
                    <form
                        className={styles["messageForm"]}
                        onSubmit={sendMessage}
                    >
                        <Input
                            type="text"
                            placeholder="Введите сообщение..."
                            id="message"
                            name="message"
                            autoComplete="off"
                        />
                        <button className={styles["sendMessage"]}>
                            <img
                                src="./sendMessage.svg"
                                alt="отправить сообщение"
                            />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chatroom;
