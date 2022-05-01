import React, {ChangeEvent, FC, KeyboardEvent, useState, useRef, useEffect} from 'react';
import styles from './inputTask.module.scss';
import {useToDoStore} from "../../../data/useToDoStore";
import {MdOutlineDeleteForever, MdOutlineEdit, MdDone} from 'react-icons/md';

interface InputTaskProps {
    id: string;
    title: string;
}

const InputTask: FC<InputTaskProps> = ({id, title}) => {
    const {updateTask, removeTask} = useToDoStore((state) => state);
    const [isChecked, setIsChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);

    const valueTitleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) valueTitleRef?.current?.focus()
    }, [isEditMode])

    const handlerChecked = () => {
        setIsChecked(!isChecked);
    }

    const handlerEdit = () => {
        setIsEditMode(true)
    }

    const handlerEditDone = () => {
        updateTask(id, value);
        setIsEditMode(false)
    }

    const handlerKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && value.length > 1) {
            updateTask(id, value);
            setIsEditMode(false)
        }
        return;
    }

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handlerRemove = () => {
        if (confirm(`Are you sure ???`)) {
            removeTask(id);
        }
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handlerChecked}
                    className={styles.checkbox}
                    disabled={isEditMode}

                />

                {
                    isEditMode ? (
                        <input
                            ref={valueTitleRef}
                            type={'text'}
                            value={value}
                            className={styles.input}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e)}
                            onKeyDown={(e) => handlerKeyDown(e)}
                        />
                    ) : (
                        <h3 className={styles.title}>{title}</h3>
                    )
                }

            </label>
            {
                isEditMode ? (
                    <button
                        className={styles.btn}
                        aria-label={'Save'}
                        onClick={handlerEditDone}
                    >
                        <MdDone/>
                    </button>
                ) : (
                    <button
                        className={styles.btn}
                        aria-label={'Edit'}
                        onClick={handlerEdit}
                    >
                        <MdOutlineEdit/>
                    </button>
                )
            }

            <button
                className={styles.btn}
                aria-label={'Remove'}
                onClick={handlerRemove}
            >
                <MdOutlineDeleteForever/>
            </button>
        </div>
    );
};

export default InputTask;