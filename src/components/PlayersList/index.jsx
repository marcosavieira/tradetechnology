import style from "./style.module.css";

export const PlayersList = ({ players, playerRef, team, season }) => {
    return (
        <div ref={playerRef} className={style.container}>
            <div className={style.teamName}>
                <strong style={{ color: "white", marginLeft: "20px" }}>
                    {team}
                </strong>
                <strong style={{ color: "white", marginRight: "20px" }}>
                    {season}
                </strong>
            </div>
            <table className={style.table}>
                <thead className={style.tableHeader}>
                    <tr className={style.tableHeaderTr}>
                        <th style={{ marginLeft: "7%" }}>Nome</th>
                        <th>Idade</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody className={style.tbodyP}>
                    {players.map((item) => (
                        <tr className={style.tableBodyTr} key={item.id}>
                            <td className={style.tableBodyTd}>{item.nome}</td>
                            <td
                                style={{
                                    width: "33%",
                                    color: "white",
                                    marginLeft: "4%",
                                }}
                            >
                                {item.idade}
                            </td>
                            <td
                                style={{
                                    width: "33%",
                                    color: "white",
                                    marginRight: "-13%",
                                }}
                            >
                                {item.nacionalidade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
