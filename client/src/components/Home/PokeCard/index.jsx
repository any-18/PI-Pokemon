import React from 'react';
import { Link } from 'react-router-dom';
import './pokeCard.css';

function PokeCard(props) {
    
    return(
        <div className='pokeCard'>
            <Link className='nameCard' to={`/details/${props.id}`}>
                <h1>{props.name}</h1>
            </Link>
            <div className='allCard'>
                <img className='imgCard' src={props.image} alt='Image Not Found' width='200px' height='250px'></img>
                <div className='typePoke'>
                    <h3>Types</h3>
                    {props.type?.map(i => (
                        <h5>{i}</h5>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokeCard;