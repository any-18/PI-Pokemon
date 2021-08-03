import React from 'react';
import { Link } from 'react-router-dom';

function PokeCard(props) {
    
    return(
        <div>
            <Link to={`/details/${props.id}`}>
                <h1>{props.name}</h1>
            </Link>
            <img src={props.image} alt='Image Not Found' width='200px' height='250px'></img>
            <h3>{props.type}</h3>
        </div>
    );
};

export default PokeCard;