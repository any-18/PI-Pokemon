const { Router } = require('express');
const router = Router();
const { getApi } = require('./controllers.js');

router.get('/pokemons', async(req, res) => {
    const {name} = req.query;
    const pokes = await getApi();
    console.log(pokes);
    if(!name) {
        return res.status(200).send(pokes)
    } else {
        const byName = await pokes.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
        byName.length ?
        res.status(200).send(byName) :
        res.status(404).send('No encontramos tu pokemon');
    };
});

module.exports = router;