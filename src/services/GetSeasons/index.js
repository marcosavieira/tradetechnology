import { API } from "../API/api";
//import seasons from "../../mocks/seasons.json";

/* export const GetSeasons = async () => {
    try {
        const data = seasons.response;
        const options = data.map((item) => ({
            value: item,
            label: item,
        }));
        return options;
    } catch (error) {
        console.log("", error);
    }
}; */
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
        //const data = seasons.response;
        const options = data.map((item) => ({
            value: item,
            label: item,
        }));
        return options;
    } catch (error) {
        console.log("", error);
    }
};
