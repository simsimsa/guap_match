import { ChangeEvent, useEffect, useState, useRef } from "react";
import styles from "./Messages.module.css";
import Search from "../../components/Search/Search";
import Chat from "../../components/Chat/Chat";

const totalChats = 100; // Общее количество чатов (будет приходить с бэкенда)

interface Chat {
    id: number;
    avatar: string;
    avtor: string;
    message: string;
    time: string;
}

export function Messages() {
    const [filter, setFilter] = useState<string>("");
    const [chats, setChats] = useState<Array<Chat>>([]); // Все чаты
    const [visibleChats, setVisibleChats] = useState<Array<Chat>>([]); // Видимые чаты
    const [page, setPage] = useState(0); // Текущая страница пагинации
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const loaderRef = useRef<HTMLDivElement | null>(null); // Референс для отслеживания прокрутки

    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newChats = Array.from({ length: totalChats }, (_, index) => ({
                id: index + 1,
                avatar: `./test1.jpg`,
                avtor: 'Avtor',
                message: `Сообщение ${index + 1}`,
                time: `10:${index<10 ? '0'+String(index % 60) : index%60}`,
            }));
            setChats(newChats);
            setIsLoading(false);
        };

        fetchChats();
    }, []);


    useEffect(() => {
        const filteredChats = chats.filter((chat) =>
            chat.message.toLowerCase().includes(filter.toLowerCase())
        );
        setVisibleChats(filteredChats.slice(0, (page + 1) * 20));
    }, [filter, chats, page]);

  
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [isLoading]);


    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setPage(0);
    };

    return (
        <div className={styles["messageLayout"]}>
            <div className={styles["message"]}>
                <div className={styles["messageHeader"]}>
                    <h1 className={styles["messageH1"]}>Dialogs</h1>
                    <div className={styles["search"]}>
                        <Search
                            placeholder="Поиск..."
                            onChange={updateFilter}
                        />
                    </div>
                </div>
                <div className={styles["hrIn"]}>
                    <hr className={styles["hr_line"]} />
                    <div className={styles["textInHr"]}>Chats</div>
                </div>
                <div className={styles["chatContainer"]}>
                    {visibleChats.map((chat) => (
                        <Chat
                            key={chat.id}
                            id={chat.id}
                            avatar={chat.avatar}
                            avtor={chat.avtor}
                            message={chat.message}
                            time={chat.time}
                        />
                    ))}
                    {isLoading && <div>Загрузка...</div>}
                    <div ref={loaderRef} style={{ height: "20px" }} />
                </div>
            </div>
        </div>
    );
}
