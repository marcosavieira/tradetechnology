import style from "./style.module.css";

export const TeamFixtures = ({ played, wins, loses, draws }) => {
    return (
        <div
            style={{
                width: "60%",
                height: "100%",
                border: "2px solid",
                display: "flex",
                flexDirection: "column",
                padding: "2%",
                borderRadius: "30px",
            }}
        >
            <strong style={{ color: "Red", padding: "0.5rem" }}>
                Jogos da Temporada
            </strong>
            <table className={style.tableFixture}>
                <thead className={style.tableHeaderFixtures}>
                    <tr className={style.tableHeaderTrFixtures}>
                        <th>Partidas</th>
                        <th>Vitórias</th>
                        <th>Derrotas</th>
                        <th>Empates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.tableBodyTrFixtures}>
                        <td>{played}</td>
                        <td>{wins}</td>
                        <td>{loses}</td>
                        <td>{draws}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
