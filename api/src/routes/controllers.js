const axios = require('axios');
const { Pokemon, TypePokemon, poke_type } = require('../db.js');

const getApi = async() => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    for(var i = 0; i < data.results.length; i++) {
        const poke = data.results[i].url
        console.log(poke);
        const all = await axios.get(poke)
            return {
                id: all.data.id,
                name: all.data.name,
                life: all.data.base_experience,
                force: all.data.is_default,
                defense: all.data.stats[2].base_stat,
                speed: all.data.stats[5].base_stat,
                height: all.data.height,
                weight: all.data.weight
            };
        };
};

module.exports = {
    getApi
}