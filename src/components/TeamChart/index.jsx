import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import style from "./style.module.css";

export const TeamChart = ({ timeA, timeB, timeC, timeD, timeE, timeF }) => {
    const data = [
        { quarter: 1, earnings: timeA },
        { quarter: 2, earnings: timeB },
        { quarter: 3, earnings: timeC },
        { quarter: 4, earnings: timeD },
        { quarter: 5, earnings: timeE },
        { quarter: 6, earnings: timeF },
    ];

    return (
        <div className={style.containerChart}>
            <div className={style.headerChart}>
                <span
                    style={{ marginLeft: "3rem" }}
                    className={style.spanChart}
                >
                    % Gols
                </span>
                <span
                    style={{ marginRight: "3rem" }}
                    className={style.spanChart}
                >
                    Tempo de jogo
                </span>
            </div>
            <VictoryChart domainPadding={10}>
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6]}
                    tickFormat={[
                        "0-15",
                        "16-30",
                        "31-45",
                        "46-60",
                        "61-75",
                        "76-90",
                    ]}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                />
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </div>
    );
};
