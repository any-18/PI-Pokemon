import { POKEMONS } from "../actions/index.jsx";
import { BYNAME } from "../actions/index.jsx";
import { BYCREATED } from "../actions/index.jsx";
import { BYORDER } from "../actions/index.jsx";
import { BYFORCE } from "../actions/index.jsx";
import { TYPES } from "../actions/index.jsx";
import { DETAILS } from "../actions/index.jsx";
import { POST } from "../actions/index.jsx";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: []
};

function rooReducer(state = initialState, action) {
    switch(action.type) {
        case POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case BYNAME:
            return {
                ...state,
                pokemons: action.payload
            }
        case BYCREATED:
            const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(i => i.createdInDb) : 
            state.allPokemons.filter(i => !i.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
            }
        case BYORDER:
            const orderName = action.payload === 'Asc' ?
            state.pokemons.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: orderName
            }
        case BYFORCE:
            const orderForce = action.payload === 'Asc' ?
            state.pokemons.sort(function(a, b) {
                if(a.force > b.force) {
                    return 1;
                }
                if(b.force > a.force) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a, b) {
                if(a.force > b.force) {
                    return -1;
                }
                if(b.force > a.force) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: orderForce
            }
        case TYPES:
            return {
                ...state,
                types: action.payload
            }
        case DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case POST:
            return {
                ...state
            }    
        default: return state    
    };
};

export default rooReducer;