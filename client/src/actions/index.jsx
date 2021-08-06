import axios from 'axios';

export const POKEMONS = 'POKEMONS';
export const BYNAME = 'BYNAME';
export const BYCREATED = 'BYCREATED';
export const BYORDER = 'BYORDER';
export const BYFORCE = 'BYFORCE';
export const DETAILS = 'DETAILS';
export const TYPES = 'TYPES';
export const POST = 'POST';

export function getPokemons() {
    return async function(dispath) {
        const res = await axios.get('http://localhost:3001/pokemons')
        return dispath({
            type: POKEMONS,
            payload: res.data
        });
    };
};


export function getbyName(name) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: BYNAME,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        };
    };
};


export function byCreated(payload) {
    return {
        type: BYCREATED,
        payload
    };
};


export function byOrder(payload) {
    return {
        type: BYORDER,
        payload
    };
};


export function byForce(payload) {
    return {
        type: BYFORCE,
        payload
    };
};


export function getDetails(id) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: DETAILS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        };
    };
};


export function getTypes() {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: TYPES,
            payload: res.data
        });
    };
};


export function postPokemon(payload) {
    return async function(dispatch) {
        const res = await axios.post('http://localhost:3001/pokemon', payload)
        return {
            type: POST,
            res
        };
    };
};