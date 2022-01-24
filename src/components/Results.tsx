import React from 'react';
import styles from "./Results.module.scss";

const Results: React.FC<{
    results: string[],
}> = ({results}) => {
    return (
        <div className={styles.wrapper}>
            <ol className={styles.results}>
                {results.map((result, i) => (
                    <li className={styles.result} key={result + i}>{result}</li>
                ))}
            </ol>
            <div className={styles.instructions}>
                Your winners!
            </div>
        </div>
    );
};

export default React.memo(Results);