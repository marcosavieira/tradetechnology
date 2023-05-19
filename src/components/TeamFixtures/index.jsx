import style from "../../Pages/Home/style.module.css";

export const TeamFixtures = ({ played, wins, loses, draws }) => {
 return (
  <div
   style={{ width: "fit-content", height: "fit-content", border: "1px solid" }}
  >
   <strong style={{ color: "Red", padding: "0.5rem" }}>
    Jogos da Temporada
   </strong>
   <table className={style.table}>
    <thead className={style.tableHeader}>
     <tr className={style.tableHeaderTr}>
      <th>Partidas</th>
      <th>Vitórias</th>
      <th>Derrotas</th>
      <th>Empates</th>
     </tr>
    </thead>
    <tbody>
     <tr className={style.tableBodyTr} style={{ gap: "4rem" }}>
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
