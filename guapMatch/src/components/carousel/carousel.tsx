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
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        setCurrent((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrent(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const handleDotClick = (index: number) => {
        setCurrent(index);
    };

    const getPrevIndex = (index: number) =>
        (index - 1 + images.length) % images.length;
    const getNextIndex = (index: number) => (index + 1) % images.length;

    const textVariants = {
        hidden: {
            opacity: 0,
            y: -30,
        },
        visible: {
            opacity: 1,
            x: -260,
            y: -30,
            transition: { duration: 0.5, delay: 2 },
        },
    };

    return (
        <div className={styles.Carousel}>
            <div className={styles.carouselTrack}>
                <AnimatePresence initial={false}>
                    <motion.div
                        className={styles.carouselInner}
                        key={current}
                        variants={{
                            enter: {
                                x: 0,
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 100,
                                },
                            },
                            exit: (custom) => ({
                                x: custom < current ? 500 : -500,
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0 },
                            }),
                        }}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        custom={current}
                    >
                        <motion.img
                            src={images[getPrevIndex(current)].img}
                            className={styles.carouselImgSmall}
                            alt={images[getPrevIndex(current)].text}
                        />
                        <motion.img
                            src={images[current].img}
                            className={styles.carouselImgLarge}
                            alt={images[current].text}
                        />
                        <motion.img
                            src={images[getNextIndex(current)].img}
                            className={styles.carouselImgSmall}
                            alt={images[getNextIndex(current)].text}
                        />

                        <motion.div
                            className={styles.carouselText}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {images[current].text}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
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
