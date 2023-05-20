import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useRef, useState } from "react";
import AsyncSelect, { useAsync } from "react-select/async";
import { GetSeasons } from "../../services/GetSeasons";
import { GetTeams } from "../../services/GetTeams";
import { PlayersList } from "../../components/PlayersList";
import { GetPlayers } from "../../services/GetPlayers";
import { GetStatistics } from "../../services/GetStatistics";
import { FormationStatistics } from "../../components/FormationStatistics";
import { TeamFixtures } from "../../components/TeamFixtures";
import { TeamChart } from "../../components/TeamChart";
import { Header } from "../../components/Header";

export const Home = () => {
    const { isLoading, data /* error */ } = useAsync(GetCountries);
    const { isLoadingLeague, dataLeague /* error */ } = useAsync(GetLeagues);
    const { isLoadingTeams, dataTeams /* error */ } = useAsync(GetTeams);
    const { isLoadingSeasons, dataSeasons /* error */ } = useAsync(GetSeasons);
    const [selectedLeagueOption, setSelectedLeagueOption] = useState("");
    const [selectedTeamOption, setSelectedTeamOption] = useState("");
    const [teamName, setTeamName] = useState("");
    const [country, setCountry] = useState([]);
    const [players, setPlayers] = useState([]);
    const [formation, setFormation] = useState({});
    const [league, setLeague] = useState([]);
    const [leagueSelect, setLeagueSelect] = useState([]);
    const [season, setSeason] = useState([]);
    const [dataSeason, setDataSeason] = useState([]);

    const countryRef = useRef(null);
    const seasonRef = useRef(null);
    const leagueRef = useRef(null);
    const teamRef = useRef(null);
    const playerRef = useRef(null);

    const handleSelectChange = async (option) => {
        if (!option) {
            return;
        }
        try {
            const response = await GetSeasons();
            setDataSeason(response);
            setCountry(option.value);
        } catch (error) {
            console.log(error);
        }
        if (seasonRef.current !== null) {
            seasonRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const handleSelectChangeSeason = async (option) => {
        if (!option) {
            return;
        }
        try {
            const response = await GetLeagues(country, option.value);
            setSeason(option.value);
            setLeague(response);
        } catch (error) {
            console.log(error);
        }
        if (leagueRef.current !== null) {
            leagueRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const handleSelectChangeLeague = async (option) => {
        if (!option) {
            return;
        }
        try {
            const response = await GetTeams(season, option.value);
            setLeagueSelect(option.value);
            setSelectedLeagueOption(response);
        } catch (error) {
            console.log(error);
        }
        if (teamRef.current !== null) {
            console.log("entrou");
            teamRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSelectChangeTeam = async (option) => {
        if (!option) {
            return;
        }
        try {
            const response = await GetPlayers(season, option.value);
            setPlayers(response);
            setTeamName(option.label);
            setSelectedTeamOption(option.value);
        } catch (error) {
            console.log(error);
        }
        try {
            if (leagueSelect && option.value && season) {
                const response = await GetStatistics(
                    leagueSelect,
                    option.value,
                    season
                );
                setFormation(response);
            }
        } catch (error) {
            console.log(error);
        }
        if (playerRef.current !== null) {
            console.log("entrou");
            playerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClearSelect = async () => {
        console.log(countryRef);
        countryRef.current.scrollIntoView({ behavior: "smooth" });
        try {
            setLeague("");
            setCountry("");
            setSeason("");
            setSelectedTeamOption("");
            setSelectedLeagueOption("");
            seasonRef = null;
            leagueRef = null;
            teamRef = null;
            playerRef = null;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetCountries();
        /* seasonRef.current = document.getElementById("season"); */
    }, []);

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.containerScroll}>
                    <div ref={countryRef} className={style.navBarCountries}>
                        <label>Países</label>
                        <AsyncSelect
                            styles={{ width: "100%" }}
                            cacheOptions
                            defaultOptions
                            loadOptions={GetCountries}
                            isLoading={isLoading}
                            options={data}
                            onChange={handleSelectChange}
                            isClearable
                        />
                    </div>

                    {country !== "" && dataSeason && (
                        <div
                            /* id="season" */
                            ref={seasonRef}
                            className={style.navBarSeasons}
                        >
                            <label>Temporadas</label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={GetSeasons}
                                isLoading={isLoadingSeasons}
                                options={dataSeasons}
                                onChange={handleSelectChangeSeason}
                                isClearable
                            />
                        </div>
                    )}

                    {league && (
                        <div ref={leagueRef} className={style.navBarLeagues}>
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
                    {leagueSelect !== "" && (
                        <div ref={teamRef} className={style.navBarLeagues}>
                            <label>Times</label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={GetTeams}
                                isLoading={isLoadingTeams}
                                options={dataTeams}
                                onChange={handleSelectChangeTeam}
                                isClearable
                            />
                        </div>
                    )}
                    <div className={style.containerTables}>
                        {selectedTeamOption && (
                            <>
                                <PlayersList
                                    team={teamName}
                                    players={players}
                                    playerRef={playerRef}
                                />

                                {formation && formation.formation && (
                                    <FormationStatistics
                                        formation={formation.formation}
                                    />
                                )}
                                {formation && formation.fixtures && (
                                    <TeamFixtures
                                        played={formation.fixtures.played.total}
                                        wins={formation.fixtures.wins.total}
                                        loses={formation.fixtures.loses.total}
                                        draws={formation.fixtures.draws.total}
                                    />
                                )}
                            </>
                        )}
                        {selectedTeamOption && formation && formation.goals && (
                            <TeamChart
                                timeA={formation.goals["0-15"].percentage}
                                timeB={formation.goals["16-30"].percentage}
                                timeC={formation.goals["31-45"].percentage}
                                timeD={formation.goals["46-60"].percentage}
                                timeE={formation.goals["61-75"].percentage}
                                timeF={formation.goals["76-90"].percentage}
                            />
                        )}
                    </div>
                    <div className={style.containerButton}>
                        <button onClick={handleClearSelect}>Limpar</button>
                    </div>
                </div>
            </div>
        </>
    );
};
