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
  //const fixtures = dataStatics.fixtures;

  /*  const fixturesTeam = fixtures.map((fixture) => ({
   played: fixture.played.total,
   wins: fixture.wins.total,
   loses: fixture.loses.total,
   draws: fixture.draws.total,
  })); */

  const formationTeam = lineups.sort((a, b) => {
   if (a.played > b.played) {
    return -1;
   }
   if (a.played < b.played) {
    return 1;
   }

   return 0;
  });
  console.log(formationTeam);
  return formationTeam[0] /* { formationTeam, fixturesTeam } */;
 } catch (error) {
  console.log("", error);
 }
};
