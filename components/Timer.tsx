
import React, { useState, useEffect } from 'react';

interface TimerProps {
    initialMinutes: number;
    title: string;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, title }) => {
    const [time, setTime] = useState(initialMinutes * 60);

    useEffect(() => {
        if (time <= 0) return;

        const intervalId = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":");
    };

    return (
        <div className="text-center bg-gray-100 p-3 rounded-lg w-full sm:w-auto">
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-2xl font-bold text-red-600 font-mono" dir="ltr">
                {formatTime(time)}
            </div>
        </div>
    );
};

export default Timer;
