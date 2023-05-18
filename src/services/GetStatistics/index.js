import { API } from "../API/api";

export const GetStatistics = async (/* team, league, season */) => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  const response = await API.get(
   `/teams/statistics?league=71&team=121&season=2022`,
   {
    headers: {
     "x-rapidapi-key": `${apiKey}`,
     "x-rapidapi-host": "v3.football.api-sports.io",
    },
   }
  );
  const dataStatics = response.data.response;
  const lineups = dataStatics.lineups;

  const formationTeam = lineups.map((lineup) => ({
   formation: lineup.formation,
   played: lineup.played,
  }));

  return formationTeam;
 } catch (error) {
  console.log("", error);
 }
};
