import styles from './Sms.module.css';
import cn from 'classnames';

type SmsProps = {
    from: "buddy" | "you";
    text: string;
    time: string;
};

function Sms({from, text, time}:SmsProps) {
    return (
        <div
            className={cn(styles["sms"], {
                [styles["buddy"]]: from === "buddy",
                [styles["you"]]: from === "you",
            })}
        >
            <div className={styles['textSms']}>{text}</div>
            <div className={styles['timeSms']}>{time}</div>
        </div>
    );
}

export default Sms;
