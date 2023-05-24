import { API } from "../API/api";
//import status from "../../mocks/status.json";

export const GetStatus = async (data) => {
    try {
        const response = await API.get("/status", {
            headers: {
                "x-rapidapi-key": `${data}`,
                "x-rapidapi-host": "v3.football.api-sports.io",
            },
        });
        if (response.data.response.account.firstname) {
            localStorage.setItem("apiKey", `${data}`);
        }

        return response.data; ///api retorno
        // return response.response.account; //mock retorno
    } catch (error) {
        console.log(error);
    }
};
/* export const GetStatus = async () => {
    const notify = (msg) => {
        if (msg === "sucess") {
            toast.success("Login Efetuado !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        if (msg === "error") {
            toast.error("Api Key inválida !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    try {
        //status;
        const response = status;
        if (response.errors.length === 0) {
            localStorage.setItem("apiKey", `21564505484sad453f4f1fd45g4df`);
            notify("sucess");
        } else {
            notify("error");
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}; */
