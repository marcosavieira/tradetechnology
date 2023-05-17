import style from "../../Pages/Home/style.module.css";

export const PlayersList = ({ players }) => {
 return (
  <div>
   <table className={style.table}>
    <thead className={style.tableHeader}>
     <tr className={style.tableHeaderTr}>
      <th>Id</th>
      <th>Nome</th>
      <th>Idade</th>
      <th>Nacionalidade</th>
     </tr>
    </thead>
    <tbody>
     {players.map((item) => (
      <tr className={style.tableBodyTr} key={item.id}>
       <td>{item.id}</td>
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
