const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();
const { getAll } = require('./controllers.js');
const { Pokemon, TypePokemon, poke_type } = require('../db.js');

router.get('/pokemons', async(req, res) => {
    const {name} = req.query;
    const pokes = await getAll();
    if(!name) {
        return res.status(200).send(pokes)
    } else {
        const byName = await pokes.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
        byName.length ?
        res.status(200).send(byName) :
        res.status(404).send('No encontramos tu pokemon');
    };
});



router.get('/pokemons/:id', async(req, res) => {
    const {id} = req.params;
    const poke = await getAll()
    if(id) {
        const pokeId = await poke.filter(i => i.id == id)
        pokeId.length?
        res.status(200).json(pokeId) :
        res.status(404).send('No encontré ese pokemon')
    }
});


router.get('/types', async(req, res) => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results
    for(var i = 0; i < types.length; i++) {
        await TypePokemon.findOrCreate({
            where: {
                name: types[i].name
            }
        })
    }
    const allTypes = await TypePokemon.findAll()
    return res.status(200).send(allTypes)
});



router.post('/pokemon', async(req, res) => {
    let {
        name,
        life,
        force,
        defense,
        speed,
        height,
        weight,
        createdInDb,
        type
    } = req.body;

    const addPoke = await Pokemon.create({
        name,
        life,
        force,
        defense,
        speed,
        height,
        weight,
        createdInDb
    });

    const createdDb = await TypePokemon.findAll({
        where: {
            name: type
        }
    });
    addPoke.addTypePokemons(createdDb)
    return res.status(200).send('Pokemon creado con exito')
});


module.exports = router;