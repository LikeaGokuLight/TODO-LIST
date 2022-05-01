import React, {ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import styles from "./inputPlus.module.scss";
import {useToDoStore} from "../../../data/useToDoStore";
import {MdOutlineAddCircleOutline} from "react-icons/md";

const InputPlus: FC = () => {
    const { createTask } = useToDoStore((state) => state);
    const [inputValue, setInputValue] = useState('');

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handlerKeyDown = (e: KeyboardEvent) => {
        if ( e.key === "Enter" && inputValue.length > 1 ) {
            createTask(inputValue);
            setInputValue("");
        }
        return;
    }

    const handlerClick = () => {
        if ( inputValue.length > 1 ) {
            createTask(inputValue);
            setInputValue("");
        } else {
            alert("No TASK added")
        }

    }

    return (
        <div className={styles.wrapper}>
            <input
                type={"text"}
                className={styles.input}
                placeholder={"Add your new task"}
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handlerKeyDown(e)}
            />
            <button
                onClick={handlerClick}
                aria-label={"add"}
                className={styles.button}
            >
                <MdOutlineAddCircleOutline size={30}/>
            </button>
        </div>
    );
};

export default InputPlus;