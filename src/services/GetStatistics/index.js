import { API } from "../API/api";
import statistics from "../../mocks/statistics.json";

export const GetStatistics = async (leagueSelect, team, season) => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  /* const response = await API.get(
   `/teams/statistics?league=${league}&team=${team}&season=2022`,
   {
    headers: {
     "x-rapidapi-key": `${apiKey}`,
     "x-rapidapi-host": "v3.football.api-sports.io",
    },
  }
  ); */
  //const dataStatics = response.data.response;
  console.log(
   `/teams/statistics?league=${leagueSelect}&team=${team}&season=${season}`
  );
  const dataStatics = statistics.response;
  const lineups = dataStatics.lineups;
  const fixtures = dataStatics.fixtures;
  const goals = dataStatics.goals.against.minute;

  const formationTeam = lineups.sort((a, b) => {
   if (a.played > b.played) {
    return -1;
   }
   if (a.played < b.played) {
    return 1;
   }

   return 0;
  });

  return {
   formation: formationTeam[0],
   fixtures: fixtures,
   goals: goals,
  };
 } catch (error) {
  console.log("", error);
 }
};
