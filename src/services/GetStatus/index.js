import { API } from "../API/api";

export const GetStatus = async (data) => {
 try {
  const response = await API.get("/status", {
   headers: {
    "x-rapidapi-key": `${data.apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  });
  if (response.status === 200) {
   localStorage.setItem("apiKey", `${data.apiKey}`);
  }

  return response.data;
 } catch (error) {
  console.error(error);
 }
};
