import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemons, byCreated, byOrder, byForce } from '../../actions/index.jsx';
import PokeCard from './PokeCard/index.jsx';
import SearchBar from './SearchBar/index.jsx';
import Paginado from './Paginado/index.jsx';
import './home.css';

function Home() {

    const dispatch = useDispatch();
    const allpokes = useSelector(e => e.pokemons);
    const [loading, setLoading] = useState(false);
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
        setLoading(true)
    }, []);

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
      <div className="home">
        <div className='allhome'>
            <Link className='linkHome' to='/pokemon'>Created Pokemon</Link>
            <button className='pokemons' onClick={e => {handleClick(e)}}>Volver a cargas los pokemons</button>
            <SearchBar></SearchBar>
            <select className='selects' onChange={e => handleCreated(e)}>
                <option value='All'>All Pokes</option>
                <option value='Created'>My poke</option>
                <option value='Api'>Api Pokes</option>
            </select>
            <div className='byOrder'>
                <h5>By Order</h5>
                <select className='selects' onChange={e => handleOrder(e)}>
                    <option value='Asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>
                <h5>By Force</h5>
                <select className='selects' onChange={e => handleForce(e)}>
                    <option value='Asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>
            </div>
        </div>
        {
            loading?
        <div>
            <Paginado
                pokePage={pokePage}
                allpokes={allpokes.length}
                paginado={paginado}
            ></Paginado>
            <div className='byCard'>
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
                                    i.createdInDb? i.typePokemons.map(i => (i.name)) : i.type.map(i => (i)) 
                                }
                            ></PokeCard>
                        </div>
                    )
                })
            }
            </div>
        </div> : <div>Loading...</div>
        }
      </div>
    );
};
  
export default Home;