import React, {Dispatch, SetStateAction, useCallback, useRef, useState} from 'react';
import styles from "./Creator.module.scss";

const Creator: React.FC<{
    options: string[]
    setOptions: Dispatch<SetStateAction<string[]>>
}> = ({options, setOptions}) => {
    const inputRef = useRef<HTMLInputElement>(null!);
    const [error, setError] = useState<string | null>(null);

    const handleOptionAdd = useCallback(() => {
        const option = inputRef.current.value;
        if (!option) return;

        if (options.indexOf(option) !== -1) {
            setError(`${option} already exists`);
            return;
        }

        setOptions(options => [...options, option]);
        inputRef.current.value = '';
    }, [options, setOptions]);

    const handleClear = useCallback(() => {
        setOptions([]);
    }, [setOptions])

    const handleInputChange = useCallback(() => {
        setError(null);
    }, []);

    const handleInputKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleOptionAdd();
        }
    }, [handleOptionAdd])

    return (
        <div className={styles.wrapper}>
            <ol className={styles.options}>
                {options.map((option, i) => (
                    <li className={styles.option} key={option + i}>{option}</li>
                ))}
            </ol>

            <div className={styles.addOptionWrapper}>
                <input
                    className={styles.addOptionInput}
                    type="text"
                    ref={inputRef}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                />
                <button
                    className={styles.addOptionButton}
                    onClick={handleOptionAdd}
                >
                    Add item
                </button>
                <button
                    className={styles.addOptionButton}
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
            {error && <span className={styles.addOptionError}>{error}</span>}

            <div className={styles.instructions}>
                Describe an item you want to compare with others. <br/>
                Add as many as you want! <br/>
                Press button below to start ranking! <br/>
            </div>
        </div>
    );
};

export default React.memo(Creator);