import style from "./style.module.css";

export const PlayersList = ({ players, playerRef, team }) => {
    return (
        <div ref={playerRef} className={style.container}>
            <div className={style.teamName}>
                <strong style={{ color: "white" }}>{team}</strong>
            </div>
            <table className={style.table}>
                <thead className={style.tableHeader}>
                    <tr className={style.tableHeaderTr}>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody className={style.tbodyP}>
                    {players.map((item) => (
                        <tr className={style.tableBodyTr} key={item.id}>
                            <td className={style.tableBodyTd}>{item.nome}</td>
                            <td style={{ width: "33%", color: "white" }}>
                                {item.idade}
                            </td>
                            <td style={{ width: "33%", color: "white" }}>
                                {item.nacionalidade}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
