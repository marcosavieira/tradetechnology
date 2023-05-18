import style from "../../Pages/Home/style.module.css";

export const PlayersList = ({ players }) => {
 return (
  <div>
   <strong style={{ color: "gray" }}>Jogadores</strong>
   <table className={style.table}>
    <thead className={style.tableHeader}>
     <tr className={style.tableHeaderTr}>
      <th>Nome</th>
      <th>Idade</th>
      <th>Nacionalidade</th>
     </tr>
    </thead>
    <tbody>
     {players.map((item) => (
      <tr className={style.tableBodyTr} key={item.id}>
       <td>{item.nome}</td>
       <td>{item.idade}</td>
       <td>{item.nacionalidade}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};
