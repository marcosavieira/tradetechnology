import style from "../../Pages/Home/style.module.css";

export const FormationStatistics = ({ formation }) => {
 return (
  <div
   style={{ width: "fit-content", height: "fit-content", border: "1px solid" }}
  >
   <strong style={{ color: "green", padding: "2rem" }}>
    Formações Mais Usadas
   </strong>
   <table className={style.table}>
    <thead className={style.tableHeader}>
     <tr className={style.tableHeaderTr}>
      <th>Formação</th>
      <th>Partidas Jogadas</th>
     </tr>
    </thead>
    <tbody>
     <tr className={style.tableBodyTr}>
      <td>{formation.formation}</td>
      <td>{formation.played}</td>
     </tr>
    </tbody>
   </table>
  </div>
 );
};
