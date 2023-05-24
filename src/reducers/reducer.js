import { actionTypes } from "./actionTypes";
export const reducer = (state, action) => {
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
