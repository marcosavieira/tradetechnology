import { API } from "../API/api";
import status from "../../mocks/status.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GetStatus = async (data) => {
    /*  const notify = (msg) => {
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
    }; */
    try {
        //status;
        const response = status; /*  await API.get("/status", {
            headers: {
                "x-rapidapi-key": `${data.apiKey}`,
                "x-rapidapi-host": "v3.football.api-sports.io",
            },
        });
        console.log(response);
        if (response.data.errors.length === 0) {
            localStorage.setItem("apiKey", `${data.apiKey}`);
        } */
        // notify("sucess");
        // } else {
        // notify("error");
        // }
        /*  return response.data; //api retorno */
        return response.response.account; //mock retorno
    } catch (error) {
        return;
    }
};
