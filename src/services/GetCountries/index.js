import { API } from "../API/api";

export const getCountries = async () => {
 const apiKey = localStorage.getItem("apiKey");
 //fake: demo7870822.mockable.io
 //correct: v3.football.api-sports.io
 try {
  const response = await API.get("/countries", {
   headers: {
    "x-rapidapi-key": `${apiKey}`,
    "x-rapidapi-host": "demo7870822.mockable.io",
   },
  });
  const data = response.data.response;

  return data;
 } catch (error) {
  console.log("", error);
 }
};
