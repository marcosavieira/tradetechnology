import style from "../../Pages/Home/style.module.css";

export const PlayersList = ({ players }) => {
 return (
  <div>
   <table>
    <thead>
     <tr>
      <th>Id</th>
      <th>Nome</th>
      <th>Idade</th>
      <th>Nacionalidade</th>
     </tr>
    </thead>
    <tbody>
     {players.map((item) => (
      <tr key={item.id}>
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
