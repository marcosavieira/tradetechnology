import { API } from "../API/api";

export const GetPlayers = async (/* team */) => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  const response = await API.get(`players?season=2022&team=121`, {
   headers: {
    "x-rapidapi-key": `${apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  });
  const data = response.data.response;
  console.log(data);
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
