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
    if(id) {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        if(id.length > 10) {
            const idDb = await Pokemon.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: TypePokemon,
                    through: poke_type
                }]
            });
            console.log(idDb)
            const all = idDb.dataValues
            return res.status(200).send(all)
        } else {
            const details = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                life: data.stats[0].base_stat,
                force: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                type: data.types.map(i => i.type.name)
            }
            return res.status(200).send(details)
        }
    } else {
        res.status(404).send('No encontramos tu pokemon')
    };
});


router.get('/types', async(req, res) => {
    const {data} = await axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results.map(i => i.name)
    const dbTypes = types.flat()
    dbTypes.forEach(i => {
        TypePokemon.findOrCreate({
            where: {
                name: i
            }
        });
    })
    const allTypes = await TypePokemon.findAll()
    return res.status(200).send(allTypes);
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