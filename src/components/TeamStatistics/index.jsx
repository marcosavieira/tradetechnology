import style from "../../Pages/Home/style.module.css";

export const TeamStatistics = ({ formation }) => {
 return (
  <div>
   <strong style={{ color: "green" }}>Formações Mais Usadas</strong>
   <table className={style.table}>
    <thead className={style.tableHeader}>
     <tr className={style.tableHeaderTr}>
      <th>Formação</th>
      <th>Partidas Jogadas</th>
     </tr>
    </thead>
    <tbody>
     {formation.map((item) => (
      <tr className={style.tableBodyTr} key={item.formation}>
       <td>{item.formation}</td>
       <td>{item.played}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};
