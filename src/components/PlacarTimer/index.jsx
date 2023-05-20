import style from "./style.module.css";
import { useState, useEffect } from "react";

export function PlacarTimer() {
    const [placarMinutes, setPlacarMinutes] = useState(0);
    const [placarSeconds, setPlacarSeconds] = useState(0);

    useEffect(() => {
        const timerPlay = setInterval(() => {
            setPlacarSeconds((prevSeconds) => {
                let updatedSeconds = prevSeconds + 1;
                let updatedMinutes = placarMinutes;

                if (updatedSeconds === 60) {
                    updatedSeconds = 0;
                    updatedMinutes += 1;
                }

                setPlacarMinutes(updatedMinutes);
                return updatedSeconds;
            });
        }, 1000);

        return () => clearInterval(timerPlay);
    });

    return (
        <div className={style.containerTimer}>
            <div className={style.currentTimer}>
                <p>Tempo</p>
                <p>
                    {placarMinutes < 10 ? `0${placarMinutes}` : placarMinutes}:
                    {placarSeconds < 10 ? `0${placarSeconds}` : placarSeconds}
                </p>
            </div>
            <div className={style.placar}>
                <p>0</p>
                <p>X</p>
                <p>0</p>
            </div>
        </div>
    );
}
