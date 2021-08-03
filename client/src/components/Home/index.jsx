import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, byCreated, byOrder, byForce } from '../../actions/index.jsx';
import PokeCard from './PokeCard/index.jsx';
import SearchBar from './SearchBar/index.jsx';
import Paginado from './Paginado/index.jsx';

function Home() {

    const dispatch = useDispatch();
    const allpokes = useSelector(e => e.pokemons);
    const [order, setOrder] = useState('');
    const [force, setForce] = useState('');
    const [page, setPage] = useState(1);
    const [pokePage, setPokePage] = useState(12);
    const indexLast = page * pokePage;
    const indexFirst = indexLast - pokePage
    const allPagPokes = allpokes.slice(indexFirst, indexLast)

    const paginado = (number) => {
        setPage(number)
    };

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    };

    function handleCreated(e) {
        dispatch(byCreated(e.target.value))
    };

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
    };
    function handleForce(e) {
        e.preventDefault();
        dispatch(byForce(e.target.value))
        setForce(`Ordenado ${e.target.value}`)
    }

    return (
      <div className="App">
        <Link to='/pokemon'>Created Pokemon</Link>
        <h1>YOUR API POKEMONS</h1>
        <button onClick={e => {handleClick(e)}}>Volver a cargas los pokemons</button>
        <SearchBar></SearchBar>
        <select onChange={e => handleCreated(e)}>
            <option value='All'>All Pokes</option>
            <option value='Created'>My poke</option>
            <option value='Api'>Api Pokes</option>
        </select>
        <div>
            <h5>By Order</h5>
            <select onChange={e => handleOrder(e)}>
                <option value='Asc'>Asc</option>
                <option value='Desc'>Desc</option>
            </select>
            <h5>By Force</h5>
            <select onChange={e => handleForce(e)}>
                <option value='Asc'>Asc</option>
                <option value='Desc'>Desc</option>
            </select>
        </div>
        <Paginado
            pokePage={pokePage}
            allpokes={allpokes.length}
            paginado={paginado}
        ></Paginado>
        <div>
            {
                allPagPokes?.map(i => {
                    return (
                        <div>
                            <PokeCard
                                key={i.id}
                                id={i.id}
                                name={i.name}
                                image={i.image}
                                type={
                                    i.type?.map(i => (i))
                                }
                            ></PokeCard>
                        </div>
                    )
                })
            }
        </div>
      </div>
    );
};
  
export default Home;