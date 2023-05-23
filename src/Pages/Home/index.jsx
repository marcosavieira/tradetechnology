import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useRef, useState } from "react";
//import AsyncSelect, { useAsync } from "react-select/async";
import Select from "react-select";
import { GetSeasons } from "../../services/GetSeasons";
import { GetTeams } from "../../services/GetTeams";
import { PlayersList } from "../../components/PlayersList";
import { GetPlayers } from "../../services/GetPlayers";
import { GetStatistics } from "../../services/GetStatistics";
import { FormationStatistics } from "../../components/FormationStatistics";
import { TeamFixtures } from "../../components/TeamFixtures";
import { TeamChart } from "../../components/TeamChart";
import { Header } from "../../components/Header";
import { Await } from "react-router-dom";

export const Home = () => {
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
    const [dataCountry, setDataCountry] = useState([]);
    //const { isLoadingLeague, dataLeague /* error */ } = useAsync(league);
    //const { isLoadingTeams, dataTeams /* error */ } = useAsync(GetTeams);

    let countryRef = useRef(null);
    let seasonRef = useRef(null);
    let leagueRef = useRef(null);
    let teamRef = useRef(null);
    let playerRef = useRef(null);
    let asyncCountry = useRef(null);
    let asyncSeason = useRef(null);
    let asyncLeague = useRef(null);
    let asyncTime = useRef(null);

    const handleSelectChangeCountry = async (option) => {
        if (!option) {
            return;
        }

        try {
            setCountry(option.value);
            const response = await GetSeasons();
            setDataSeason(response);
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
        const countryFormat = country.toLowerCase();

        try {
            const response = await GetLeagues(countryFormat);
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
            playerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClearSelect = async () => {
        countryRef.current.scrollIntoView({ behavior: "smooth" });
        try {
            asyncCountry.current.clearValue();
            asyncSeason.current.clearValue();
            asyncLeague.current.clearValue();
            asyncTime.current.clearValue();
            setCountry("");
            setLeague("");
            setSeason("");
            setSelectedTeamOption("");
            setSelectedLeagueOption("");
        } catch (error) {
            console.log(error);
        }
    };

    /*  useEffect(() => {
         GetCountries();
        
        
    }, []); */

    useEffect(() => {
        if (!countryRef.current.value) {
            const fetchData = async () => {
                const response = await GetCountries();
                setDataCountry(response);
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <Header />
            <div className={style.container}>
                <div className={style.containerScroll}>
                    <div ref={countryRef} className={style.navBarCountries}>
                        <label>Países</label>
                        <Select
                            options={dataCountry}
                            onChange={handleSelectChangeCountry}
                            ref={asyncCountry}
                        />
                    </div>

                    <div ref={seasonRef} className={style.navBarSeasons}>
                        <label>Temporadas</label>
                        {country !== "" && (
                            <Select
                                options={dataSeason}
                                onChange={handleSelectChangeSeason}
                                ref={asyncSeason}
                            />
                        )}
                    </div>

                    <div ref={leagueRef} className={style.navBarLeagues}>
                        <label>Leagues</label>
                        {season && (
                            <Select
                                options={league}
                                onChange={handleSelectChangeLeague}
                                ref={asyncLeague}
                            />
                        )}
                    </div>

                    <div ref={teamRef} className={style.navBarLeagues}>
                        <label>Times</label>
                        {leagueSelect && (
                            <Select
                                options={selectedLeagueOption}
                                onChange={handleSelectChangeTeam}
                                ref={asyncTime}
                            />
                        )}
                    </div>

                    <div className={style.containerTables}>
                        {selectedTeamOption && (
                            <>
                                <PlayersList
                                    team={teamName}
                                    season={season}
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
                </div>
                <div className={style.containerButton}>
                    <button onClick={handleClearSelect}>Nova Pesquisa</button>
                </div>
            </div>
        </>
    );
};
