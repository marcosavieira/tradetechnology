import { API } from "../API/api";
//import teams from "../../mocks/teams.json";

/* export const GetTeams = async () => {
    const data = teams.response;
    const options = data.map((item) => ({
        value: item.team.id,
        label: item.team.name,
    }));
    return options;
}; */
export const GetTeams = async (season, league) => {
    const apiKey = localStorage.getItem("apiKey");
    //fake: demo7870822.mockable.io
    //correct: v3.football.api-sports.io
    try {
        const response = await API.get(
            `/teams?league=${league}&season=${season}`,
            {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io",
                },
            }
        );
        const data = response.data.response;
        // console.log(`/teams?league=${league}&season=${season}`);
        //const data = teams.response;
        const options = data.map((item) => ({
            value: item.team.id,
            label: item.team.name,
        }));
        return options;
    } catch (error) {
        console.log("", error);
    }
};
