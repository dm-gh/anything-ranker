import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import styles from './Comparator.module.scss';

const Comparator: React.FC<{
    options: string[],
    setResults: Dispatch<SetStateAction<string[]>>,
    onFinish: () => void,
}> = ({options, setResults, onFinish}) => {
    const [[itemA, itemB], setComparingItems] = useState<[string, string]>(['', '']);
    const [handleCompare, setHandleCompare] = useState<(answer: boolean) => void>(() => false);

    const compareTwoOptions = useCallback(async (a: string, b: string) => {
        return new Promise<boolean>(resolve => {
            setComparingItems([a, b]);
            setHandleCompare(() => resolve);
        })
    }, [])

    useEffect(() => {
        let rejectPromise = () => {};

        new Promise(async (resolve, reject) => {
            rejectPromise = reject;

            const sortedList = await asyncQuickSort(options, compareTwoOptions);

            rejectPromise = () => {};
            setResults(sortedList);
            onFinish();
        })

        return () => {
            rejectPromise();
        }
    }, [options, setResults, onFinish, compareTwoOptions]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <button onClick={() => handleCompare(true)}>
                    {itemA}
                </button>
                <span>
                    or
                </span>
                <button onClick={() => handleCompare(false)}>
                    {itemB}
                </button>
            </div>
            <div className={styles.instructions}>
                Select which item is objectively better than other!
            </div>
        </div>
    );
};

export default React.memo(Comparator);

async function asyncQuickSort<T>(list: T[], compare: (a: T, b: T) => Promise<boolean>): Promise<T[]> {
    if (list.length <= 1) {
        return list;
    }

    const pivot = list[0];

    const left = [];
    const right = [];

    for (let i = 1; i < list.length; i++) {
        if (await compare(list[i], pivot)) {
            left.push(list[i]);
        } else {
            right.push(list[i]);
        }
    }

    const sortedLeft = await asyncQuickSort(left, compare);
    const sortedRight = await asyncQuickSort(right, compare);

    return sortedLeft.concat(pivot, sortedRight);
}