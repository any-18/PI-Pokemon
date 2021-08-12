import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../../actions/index.jsx';
import './details.css';

function Details(props) {

    const [loading, setLoading] = useState(false);
    const details = useSelector(i => i.details);
    const pokemons = useSelector(i => i.pokemons);
    const dispatch = useDispatch();
    const {id} = props.match.params;

    useEffect(() => {
        dispatch(getDetails(id))
        setLoading(true)
    }, [id, dispatch]);

    return (
      <div className="details">
            <div className='allDetails'>
                {
                    details.length > 0 ?
                    <div>
                        <h6 className='idDetails'>{details[0].id}</h6>
                        <h1 className='nameDetails'>{details[0].name}</h1>
                        <div>
                            <img className='imgDetails' src={details[0].image} alt='Image Not Found'></img>
                            <hr className='hr'></hr>
                            <h1 className='typesD'>Types</h1>
                                {
                                    !details[0].createdINDb? details[0].type + '' : details[0].type.map(i => i.name + (''))}
                            <hr className='hr'></hr>
                            <div className='stadistics'>
                                <h1>Statistics</h1>
                                <h4>Life: {details[0].life}</h4>
                                <h4>Force: {details[0].force}</h4>
                                <h4>Defense: {details[0].defense}</h4>
                                <h4>Speed: {details[0].speed}</h4>
                            </div>
                            <hr className='hr'></hr>
                            <h3>Height: {details[0].height}</h3>
                            <h3>Weight: {details[0].weight}</h3>
                        </div>
                    </div> : <div>Loading</div>
                }
            </div>
        </div>
    );
  };
  
  export default Details;