import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Home.module.css";
import cn from "classnames";
import { Outlet } from "react-router-dom";

export function Home() {
    const [filtr, setfiltr] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [action, setAction] = useState<"like" | "dislike" | null>(null);
    const [yesorno, setyesorno] = useState<
        "like" | "dislike" | "random" | null
    >(null);

  
    const images = ["/test1.jpg", "/test2.jpg", "/test3.jpg"];


    const random = () => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            handleLike();
        } else {
            handleDislike();
        }
    };


    const handleLike = () => {
        setAction("like");
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length); 
            setAction(null); 
        }, 1000); 
    };

    
    const handleDislike = () => {
        setAction("dislike");
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length); 
            setAction(null); 
        }, 1000); 
    };

    return (
        <div className={styles["svapLayout"]}>
            <div className={styles["svap"]}>
                <button
                    className={styles["filter"]}
                    onClick={() => {
                        setfiltr(true);
                    }}
                >
                    <img src="./sort-two.svg" alt="" />
                </button>

                <div className={styles["svapHeader"]}>
                    <h1 className={styles["svapH1"]}>Svap</h1>
                    <div className={styles["svapHeaderBody"]}>
                        This is a page where you can find interesting people to
                        chat with.
                    </div>
                </div>

                <div
                    style={{
                        backgroundImage: `url(${
                            images[(currentImageIndex + 1) % images.length]
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "440px",
                        height: "440px",
                    }}
                    className={styles["after-container"]}
                >
                    <AnimatePresence>
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{
                                opacity: action ? 0 : 1,
                                scale: action ? 0.5 : 1,
                                x:
                                    action === "like"
                                        ? 400
                                        : action === "dislike"
                                        ? -400
                                        : 0,
                            }}
                            transition={{ duration: 1 }}
                            className={styles["container"]}
                            style={{
                                backgroundImage: `url(${images[currentImageIndex]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                width: "460px",
                                height: "460px",
                            }}
                        >
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className={styles["overlay"]}
                                    >
                                        {yesorno === "like" ? (
                                            <img src="./likesvap.svg" alt="" />
                                        ) : yesorno === "random" ? (
                                            <img src="./question.svg" alt="" />
                                        ) : (
                                            <img src="./dislike.svg" alt="" />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className={styles["location"]}>
                                <img src="./local-two.svg" alt="" />
                                <div>Общажка</div>
                            </div>
                            <div className={styles["svapInfo"]}>
                                <div className={styles["svapInfoHeader"]}>
                                    <div>Ксюша, </div>
                                    <div>19 лет</div>
                                </div>
                                <div className={styles["svapInfoBody"]}>
                                    <div>ИВТ, </div>
                                    <div>2 курс</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles["svapChoise"]}>
                    <button
                        className={styles["choiseDislike"]}
                        onClick={handleDislike}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img src="./dislike.svg" alt="" />
                    </button>
                    <button
                        className={styles["svapRandom"]}
                        onClick={random}
                        onMouseEnter={() => {
                            setIsHovered(true);
                            setyesorno("random");
                        }}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setyesorno("dislike");
                        }}
                    >
                        Random
                    </button>
                    <button
                        className={styles["choiseLike"]}
                        onClick={handleLike}
                        onMouseEnter={() => {
                            setIsHovered(true);
                            setyesorno("like");
                        }}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setyesorno("dislike");
                        }}
                    >
                        <img src="./likesvap.svg" alt="" />
                    </button>
                </div>

                <div
                    className={cn(styles["filter_display"], {
                        [styles["hidden"]]: filtr === false,
                    })}
                >
                    <Outlet context={setfiltr} />
                </div>
            </div>
        </div>
    );
}
