const { expect } = require('chai');
const { INET } = require('sequelize/types');
const session = require('supertest-session');
const app = require('../app.js');

const agent = session(app);

describe('Poke Test', () => {
    describe('GET', () => {
        it('responds with 200', () => agent.get('/pokemons').expect(200));
        it('responds with and object', () => 
        agent.get('/pokemons').then((res) => {
            expect(res.body.object).to.be.equal(object);
        }));
    });
})