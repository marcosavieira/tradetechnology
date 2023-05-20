import style from "./style.module.css";

export const PlayersList = ({ players, playerRef }) => {
    return (
        <div ref={playerRef} className={style.container}>
            <strong style={{ color: "gray", marginLeft: "14%" }}>
                Jogadores
            </strong>
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
