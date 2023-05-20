import style from "./style.module.css";

export const FormationStatistics = ({ formation }) => {
    return (
        <div style={{ width: "60%", height: "100%", border: "1px solid" }}>
            <strong style={{ color: "green", padding: "2rem" }}>
                Formações Mais Usadas
            </strong>
            <table className={style.tableFormaton}>
                <thead className={style.tableHeaderFormation}>
                    <tr className={style.tableHeaderTrFormation}>
                        <th>Formação</th>
                        <th>Partidas Jogadas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.tableBodyTrFormation}>
                        <td>{formation.formation}</td>
                        <td>{formation.played}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
