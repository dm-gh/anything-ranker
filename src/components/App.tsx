import React, {useCallback, useState} from 'react';
import styles from './App.module.scss';
import Creator from "./Creator";
import Comparator from "./Comparator";
import Results from "./Results";

const App: React.FC = () => {
    const [mode, setMode] = useState<'create' | 'compare' | 'results'>('create');
    const [options, setOptions] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);

    const handleStartCompare = useCallback(() => {
        if (options.length === 0) return;

        setMode('compare');
    }, [options]);

    const handleBackToEdit = useCallback(() => {
        setMode('create');
    }, [])

    const handleCompareFinish = useCallback(() => {
        setMode('results');
    }, [])

    const handleStartOver = useCallback(() => {
        setMode('create');
        setResults([]);
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Anything Ranker</div>
            <div className={styles.subtitle}>Rank anything!</div>

            {mode === 'create' && (
                <div className={styles.content}>
                    <Creator options={options} setOptions={setOptions}/>
                    <button onClick={handleStartCompare}>
                        Start Ranking
                    </button>
                </div>
            )}

            {mode === 'compare' && (
                <div className={styles.content}>
                    <Comparator
                        options={options}
                        setResults={setResults}
                        onFinish={handleCompareFinish}
                    />
                    <button onClick={handleBackToEdit}>
                        Back to edit
                    </button>
                </div>
            )}

            {mode === 'results' && (
                <div className={styles.content}>
                    <Results results={results}/>
                    <button onClick={handleStartOver}>
                        Start over!
                    </button>
                </div>
            )}
        </div>
    );
}

export default React.memo(App);
