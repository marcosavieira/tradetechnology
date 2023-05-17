import { API } from "../API/api";

export const GetTeams = async (/* league */) => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  const response = await API.get(`/teams?league=71&season=2019`, {
   headers: {
    "x-rapidapi-key": `${apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  });
  const data = response.data.response;
  console.log(data);
  const options = data.map((item) => ({
   value: item.team.id,
   label: item.team.name,
  }));
  return options;
 } catch (error) {
  console.log("", error);
 }
};
