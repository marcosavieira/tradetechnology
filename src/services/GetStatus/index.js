import { API } from "../API/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GetStatus = async (data) => {
 const notify = (msg) => {
  if (msg === "sucess") {
   console.log("entrou");
   toast.success("Login Efetuado !", {
    position: toast.POSITION.TOP_RIGHT,
   });
  }
  if (msg === "error") {
   console.log("entrou");
   toast.error("Api Key inválida !", {
    position: toast.POSITION.TOP_RIGHT,
   });
  }
 };
 try {
  const response = await API.get("/status", {
   headers: {
    "x-rapidapi-key": `${data.apiKey}`,
    "x-rapidapi-host": "v3.football.api-sports.io",
   },
  });
  if (response.data.errors.length === 0) {
   localStorage.setItem("apiKey", `${data.apiKey}`);
   notify("sucess");
  } else {
   notify("error");
  }
  return response.data;
 } catch (error) {
  console.error(error);
 }
};
