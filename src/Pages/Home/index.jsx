import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useState } from "react";
import AsyncSelect, { useAsync } from "react-select/async";
import { GetSeasons } from "../../services/GetSeasons";
import { GetTeams } from "../../services/GetTeams";
import { PlayersList } from "../../components/PlayersList";
import { GetPlayers } from "../../services/GetPlayers";
import { GetStatistics } from "../../services/GetStatistics";
import { TeamStatistics } from "../../components/TeamStatistics";

export const Home = () => {
 const { isLoading, data /* error */ } = useAsync(GetCountries);
 const { isLoadingLeague, dataLeague /* error */ } = useAsync(GetLeagues);
 const { isLoadingTeams, dataTeams /* error */ } = useAsync(GetTeams);
 const { isLoadingSeasons, dataSeasons /* error */ } = useAsync(GetSeasons);
 const [selectedCountryOption, setSelectedCountryOption] = useState("");
 const [selectedLeagueOption, setSelectedLeagueOption] = useState("");
 const [selectedTeamOption, setSelectedTeamOption] = useState("");
 const [players, setPlayers] = useState([]);
 const [formation, setFormation] = useState([]);
 const [fixtures, setFixtures] = useState([]);

 const handleSelectChange = (option) => {
  setSelectedCountryOption(option.value);
 };
 const handleSelectChangeLeague = async (option) => {
  await GetTeams(option.value);
  return setSelectedLeagueOption(option.value);
 };
 const handleSelectChangeTeam = (option) => {
  const fetchPlayers = async () => {
   try {
    const list = await GetPlayers(option.value);
    const formationTeam = await GetStatistics();
    //const { formationTeam, fixturesTeam } = formationList;
    setPlayers(list);
    setFormation(formationTeam.formation);
    setFixtures(formationTeam.fixtures);
   } catch (error) {
    console.log("Erro ao obter a lista de jogadores:", error);
   }
  };

  fetchPlayers();
  setSelectedTeamOption(option.value);
 };

 const handleClearSelect = () => {
  setSelectedCountryOption("");
  setSelectedTeamOption("");
 };
 const fetchData = async () => {
  await GetCountries();
  await GetSeasons();

  if (selectedCountryOption !== "") {
   await GetLeagues(selectedCountryOption);
  }
 };
 useEffect(() => {
  //pesquisar useEffect async
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
   <div className={style.navBarLeagues}>
    <label>Leagues</label>
    {selectedCountryOption && (
     <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={GetLeagues}
      isLoading={isLoadingLeague}
      options={dataLeague}
      onChange={handleSelectChangeLeague}
      isClearable
     />
    )}
   </div>
   <div className={style.navBarLeagues}>
    <label>Times</label>
    {selectedLeagueOption && (
     <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={GetTeams}
      isLoading={isLoadingTeams}
      options={dataTeams}
      onChange={handleSelectChangeTeam}
      isClearable
     />
    )}
   </div>
   <div
    style={{
     display: "flex",
     flexDirection: "row",
     gap: "40px",
     width: "20rem",
     height: "20rem",
    }}
   >
    {selectedTeamOption && (
     <>
      <PlayersList players={players} />
      <TeamStatistics formation={formation} />
     </>
    )}
    {console.log(fixtures)}
   </div>
   <div className={style.containerButton}>
    <button onClick={handleClearSelect}>Limpar</button>
   </div>
  </div>
 );
};
