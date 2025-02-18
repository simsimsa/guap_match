import styles from "./Carousel.module.css";
import { useState } from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

interface CarouselProps {
    images: {
        img: string;
        text: string;
    }[];
}

const Carousel = ({ images }: CarouselProps) => {

     const [direction, setDirection] = useState("left");

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };


    const [current, setcurrent] = useState(0);
    const handleNext = () => {
        setDirection("right");
        setcurrent((prevIndex: number) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };
    const handlePrevious = () => {
        setDirection("left");
        setcurrent((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const handleDotClick = (index: number) => {
        setDirection(index > current ? "right" : "left");
        setcurrent(index);
    };

    return (
        <div className={styles["Carousel"]}>
            <AnimatePresence>
                <motion.img
                    src={images[current].img}
                    key={current}
                    className={styles["carouselImg"]}
                    variants={slideVariants}
                    initial={
                        direction === "right" ? "hiddenRight" : "hiddenLeft"
                    }
                    animate="visible"
                    exit="exit"
                />
                <motion.div className={styles["carouselText"]}>
                    {images[current].text}
                </motion.div>
            </AnimatePresence>
            <div className={styles["slides"]}>
                <div className={styles["slide-left"]} onClick={handlePrevious}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                    </svg>
                </div>
                <div className={styles["slide-right"]} onClick={handleNext}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                    </svg>
                </div>
            </div>
            <div className={styles["indicator"]}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={cn(styles["dot"], {
                            [styles["active"]]: current === index,
                        })}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
