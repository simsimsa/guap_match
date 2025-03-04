import styles from "./search.module.css";
import cn from "classnames";
import { forwardRef } from "react";
import { SearchProps } from "./Search.props";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles["input-wrapper"]}>
            <input
                ref={ref}
                {...props}
                className={cn(styles["input"], className, {
                    [styles["invalid"]]: isValid,
                })}
            />
            <img
                className={styles["icon_search"]}
                src="/search.svg"
                alt="search"
            />
        </div>
    );
});

export default Search;
