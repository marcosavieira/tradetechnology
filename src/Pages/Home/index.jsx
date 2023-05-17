import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useState } from "react";
import AsyncSelect, { useAsync } from "react-select/async";
import { GetSeasons } from "../../services/GetSeasons";
import { GetTeams } from "../../services/GetTeams";

export const Home = () => {
 const { isLoading, data /* error */ } = useAsync(GetCountries);
 const { isLoadingLeague, dataLeague /* error */ } = useAsync(GetLeagues);
 const { isLoadingTeams, dataTeams /* error */ } = useAsync(GetTeams);
 const { isLoadingSeasons, dataSeasons /* error */ } = useAsync(GetSeasons);
 const [selectedCountryOption, setSelectedCountryOption] = useState("");
 const [selectedLeagueOption, setSelectedLeagueOption] = useState("");
 /* const [selectedTeamOption, setSelectedTeamOption] = useState(""); */

 const handleSelectChange = (option) => {
  setSelectedCountryOption(option.value);
 };
 const handleSelectChangeLeague = async (option) => {
  await GetTeams(option.value);
  return setSelectedLeagueOption(option.value);
 };
 /* const handleSelectChangeTeam = async (option) => {
  await GetPlayers(option.value);
  return setSelectedTeamOption(option.value);
 }; */

 const handleClearSelect = () => {
  setSelectedCountryOption("");
 };
 const fetchData = async () => {
  await GetCountries();
  await GetSeasons();

  if (selectedCountryOption !== "") {
   await GetLeagues(selectedCountryOption);
  }
 };
 useEffect(() => {
  fetchData();
 }, []);

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
      onChange={handleSelectChangeLeague}
      isClearable
     />
    </div>
   )}
   {selectedLeagueOption && (
    <div className={style.navBarLeagues}>
     <label>Times</label>
     <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={GetTeams}
      isLoading={isLoadingTeams}
      options={dataTeams}
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
