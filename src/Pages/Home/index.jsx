import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { useEffect } from "react";
import AsyncSelect, { useAsync } from "react-select/async";

export const Home = () => {
 useEffect(() => {
  GetCountries();
 }, []);

 const { isLoading, data /* error */ } = useAsync(GetCountries);
 return (
  <div className={style.container}>
   <div className={style.navBarCountries}>
    <label>Países</label>
    <AsyncSelect
     cacheOptions
     defaultOptions
     loadOptions={GetCountries}
     isLoading={isLoading}
     options={data}
     isClearable
    />
   </div>
  </div>
 );
};
