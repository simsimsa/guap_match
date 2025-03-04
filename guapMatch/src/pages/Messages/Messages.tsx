import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Messages.module.css";
import Search from "../../components/Search/Search";

export function Messages() {

    const [filter, setfilter] = useState<string>();

    useEffect(() => {
        getdialog(filter);
    }, [filter]);

    const getdialog = (filter:string|undefined)=>{
        console.log('тут будет фильтр диалогов', filter)
    }


    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setfilter(event.target.value);
    };

    return (
        <div className={styles["messageLayout"]}>
            <div className={styles["message"]}>
                <div className={styles["messageHeader"]}>
                    <h1 className={styles["messageH1"]}>Dialogs</h1>
                    <div className={styles["search"]}>
                        <Search placeholder="" onChange={updateFilter} />
                    </div>
                </div>
                <div className={styles["hrIn"]}>
                    <hr className={styles["hr_line"]} />
                    <div className={styles["textInHr"]}>Chats</div>
                </div>
            </div>
        </div>
    );
}
