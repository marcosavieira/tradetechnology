import { API } from "../API/api";
//import countries from "../../mocks/countries.json";

export const GetCountries = async () => {
    const apiKey = localStorage.getItem("apiKey");
    //fake: demo7870822.mockable.io
    //correct: v3.football.api-sports.io
    try {
        const response = await API.get("/countries", {
            headers: {
                "x-rapidapi-key": `${apiKey}`,
                "x-rapidapi-host": "v3.football.api-sports.io",
            },
        });

        const data = response.data.response;
        const options = data.map((item) => ({
            value: item.name,
            label: item.name,
        }));
        return options;
    } catch (error) {
        console.log("", error);
    }
};
/* export const GetCountries = async () => {
    //chamada mock
    try {
        const response = countries;
        const data = response.response;
        const options = data.map((item) => ({
            value: item.name,
            label: item.name,
        }));
        return options;
    } catch (error) {
        console.log("", error);
    }
};
 */
