import style from "./style.module.css";

export const FormationStatistics = ({ formation }) => {
    return (
        <div className={style.containerFormation}>
            <strong style={{ color: "white", padding: "2rem" }}>
                Formação Preferida
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
