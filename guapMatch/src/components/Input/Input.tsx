import { forwardRef } from "react";
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import cn from "classnames";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <input
            {...props}
            ref={ref}
            className={cn(styles["input"], className, {
                [styles["invalid"]]: isValid,
            })}
        />
    );
});

export default Input;
