import { API } from "../API/api";
import players from "../../mocks/players.json";

export const GetPlayers = async (season, team) => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  /*  const response = await API.get(`players?season=2022&team=${team}`, {
   headers: {
    "x-rapidapi-key": `${apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  }); */
  //const data = response.data.response;
  console.log(`players?season=${season}&team=${team}`);
  const data = players.response;
  const list = data.map((item) => ({
   id: item.player.id,
   nome: item.player.name,
   idade: item.player.age,
   nacionalidade: item.player.nationality,
  }));
  return list;
 } catch (error) {
  console.log("", error);
 }
};
