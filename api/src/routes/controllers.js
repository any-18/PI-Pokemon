const axios = require('axios');
const db = require('../db.js');
const { Pokemon, TypePokemon, poke_type } = require('../db.js');

const getApi = async() => {
    const pokes = [];
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    for(var i = 0; i < data.results.length; i++) {
        const poke = data.results[i].url
        console.log(poke);
        const all = await axios.get(poke)
        const allpokes =  {
            id: all.data.id,
            name: all.data.name,
            image: all.data.sprites.front_shiny,
            type: all.data.types.map(i => i.type.name)
        };
        pokes.push(allpokes)
    };
    return pokes;
};

const getDb = async() => {
    return await Pokemon.findAll({
        include: {
            model: TypePokemon,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};

const getAll = async() => {
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

module.exports = {
    getAll
}