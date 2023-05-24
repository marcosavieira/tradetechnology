import style from "./style.module.css";
import { GetCountries } from "../../services/GetCountries";
import { GetLeagues } from "../../services/GetLeagues";
import { useEffect, useRef, useState, useReducer } from "react";
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

export const Home = () => {
    // const [selectedLeagueOption, setSelectedLeagueOption] = useState("");
    //const [teamName, setTeamName] = useState("");
    //const [country, setCountry] = useState([]);
    //const [players, setPlayers] = useState([]);
    //const [formation, setFormation] = useState({});
    //const [league, setLeague] = useState([]);
    //const [leagueSelect, setLeagueSelect] = useState([]);
    //const [season, setSeason] = useState([]);
    //const [dataSeason, setDataSeason] = useState([]);
    //const [dataCountry, setDataCountry] = useState([]);

    const initialState = {
        country: "",
        dataCountry: [],
        dataSeason: [],
        season: 0,
        league: [],
        leagueSelect: [],
        selectedLeagueOption: [],
        teamName: 0,
        teamNameLabel: "",
        players: [],
        formation: {},
    };

    const actionTypes = {
        SET_COUNTRY: "SET_COUNTRY",
        SET_DATA_COUNTRY: "SET_DATA_COUNTRY",
        SET_DATA_SEASON: "SET_DATA_SEASON",
        SET_SEASON: "SET_SEASON",
        SET_LEAGUE: "SET_LEAGUE",
        SET_LEAGUE_SELECT: "SET_LEAGUE_SELECT",
        SET_LEAGUE_SELECT_OPTION: "SET_LEAGUE_SELECT_OPTION",
        SET_TEAM_NAME: "SET_TEAM_NAME",
        SET_PLAYERS: "SET_PLAYERS",
        SET_FORMATION: "SET_FORMATION",
        SET_TEAM_NAME_LABEL: "SET_TEAM_NAME_LABEL",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case actionTypes.SET_COUNTRY:
                return { ...state, country: action.payload };
            case actionTypes.SET_DATA_COUNTRY:
                return { ...state, dataCountry: action.payload };
            case actionTypes.SET_DATA_SEASON:
                return { ...state, dataSeason: action.payload };
            case actionTypes.SET_SEASON:
                return { ...state, season: action.payload };
            case actionTypes.SET_LEAGUE:
                return { ...state, league: action.payload };
            case actionTypes.SET_LEAGUE_SELECT:
                return { ...state, leagueSelect: action.payload };
            case actionTypes.SET_LEAGUE_SELECT_OPTION:
                return { ...state, selectedLeagueOption: action.payload };
            case actionTypes.SET_TEAM_NAME:
                return { ...state, teamName: action.payload };
            case actionTypes.SET_TEAM_NAME_LABEL:
                return { ...state, teamNameLabel: action.payload };
            case actionTypes.SET_PLAYERS:
                return { ...state, players: action.payload };
            case actionTypes.SET_FORMATION:
                return { ...state, formation: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        country,
        dataCountry,
        dataSeason,
        season,
        league,
        leagueSelect,
        selectedLeagueOption,
        teamName,
        teamNameLabel,
        players,
        formation,
    } = state;
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
            dispatch({ type: actionTypes.SET_COUNTRY, payload: option.value });
            const response = await GetSeasons();
            dispatch({ type: actionTypes.SET_DATA_SEASON, payload: response });
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
            dispatch({ type: actionTypes.SET_SEASON, payload: option.value });
            dispatch({ type: actionTypes.SET_LEAGUE, payload: response });
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
            dispatch({
                type: actionTypes.SET_LEAGUE_SELECT,
                payload: option.value,
            });
            dispatch({
                type: actionTypes.SET_LEAGUE_SELECT_OPTION,
                payload: response,
            });
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
            dispatch({
                type: actionTypes.SET_TEAM_NAME,
                payload: option.value,
            });
            dispatch({
                type: actionTypes.SET_TEAM_NAME_LABEL,
                payload: option.label,
            });
            dispatch({ type: actionTypes.SET_PLAYERS, payload: response });
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
                dispatch({
                    type: actionTypes.SET_FORMATION,
                    payload: response,
                });
                //setFormation(response);
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
            dispatch({ type: actionTypes.SET_COUNTRY, payload: "" });
            dispatch({ type: actionTypes.SET_LEAGUE, payload: "" });
            dispatch({ type: actionTypes.SET_SEASON, payload: "" });
            dispatch({
                type: actionTypes.SET_LEAGUE_SELECT_OPTION,
                payload: "",
            });
            dispatch({
                type: actionTypes.SET_TEAM_NAME,
                payload: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("Chamou o useEffect");
        if (!countryRef.current.value) {
            const fetchData = async () => {
                const response = await GetCountries();
                dispatch({
                    type: actionTypes.SET_DATA_COUNTRY,
                    payload: response,
                });
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
                        <label>Campeonatos</label>
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
                        {teamName && (
                            <>
                                <PlayersList
                                    team={teamNameLabel}
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
                        {teamName && formation && formation.goals && (
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
