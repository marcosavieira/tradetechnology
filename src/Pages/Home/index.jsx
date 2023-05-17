import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { useEffect, useState } from "react";
import AsyncSelect, { useAsync } from "react-select/async";

export const Home = () => {
 useEffect(() => {
  GetCountries();
 }, []);

 const { isLoading, data /* error */ } = useAsync(GetCountries);
 const [selectedCountryOption, setSelectedCountryOption] = useState("");

 const handleSelectChange = (option) => {
  setSelectedCountryOption(option.value);
 };
 const handleClearSelect = () => {
  setSelectedCountryOption("");
 };

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
     onChange={handleSelectChange}
     isClearable
    />
   </div>
   {selectedCountryOption && (
    <div className={style.navBarLeagues}>
     <label>Leagues</label>
    </div>
   )}
   <div className={style.containerButton}>
    <button onClick={handleClearSelect}>Limpar</button>
   </div>
  </div>
 );
};
