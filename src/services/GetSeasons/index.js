import { API } from "../API/api";

export const GetSeasons = async () => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  const response = await API.get("leagues/seasons", {
   headers: {
    "x-rapidapi-key": `${apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  });
  const data = response.data.response;
  const options = data.map((item) => ({
   value: item,
   label: item,
  }));
  return options;
 } catch (error) {
  console.log("", error);
 }
};