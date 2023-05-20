import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

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
        <div
            style={{
                display: "flex",
                width: "52%",
                height: "100%",
                alignItems: "center",
                border: "1px solid",
                justifyContent: "center",
                marginTop: "60%",
            }}
        >
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
