import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useState } from "react";
import AsyncSelect, { useAsync } from "react-select/async";
import { GetSeasons } from "../../services/GetSeasons";

export const Home = () => {
 const { isLoading, data /* error */ } = useAsync(GetCountries);
 const { isLoadingLeague, dataLeague /* error */ } = useAsync(GetLeagues);
 const { isLoadingSeasons, dataSeasons /* error */ } = useAsync(GetLeagues);
 const [selectedCountryOption, setSelectedCountryOption] = useState("");

 const handleSelectChange = (option) => {
  setSelectedCountryOption(option.value);
 };
 const handleClearSelect = () => {
  setSelectedCountryOption("");
 };
 useEffect(() => {
  GetCountries();
  if (selectedCountryOption !== "") {
   GetLeagues(selectedCountryOption);
  }
 }, [selectedCountryOption]);

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
   <div className={style.navBarSeasons}>
    <label>Temporadas</label>
    <AsyncSelect
     cacheOptions
     defaultOptions
     loadOptions={GetSeasons}
     isLoading={isLoadingSeasons}
     options={dataSeasons}
     isClearable
    />
   </div>
   {selectedCountryOption && (
    <div className={style.navBarLeagues}>
     <label>Leagues</label>
     <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={GetLeagues}
      isLoading={isLoadingLeague}
      options={dataLeague}
      isClearable
     />
    </div>
   )}
   <div className={style.containerButton}>
    <button onClick={handleClearSelect}>Limpar</button>
   </div>
  </div>
 );
};
