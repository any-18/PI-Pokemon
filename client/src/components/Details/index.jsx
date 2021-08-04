import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../../actions/index.jsx';
import './details.css';

function Details(props) {

    const [loading, setLoading] = useState(false);
    const details = useSelector(i => i.details);
    const dispatch = useDispatch();
    const {id} = props.match.params;

    useEffect(() => {
        dispatch(getDetails(id))
        setLoading(true)
    }, [id, dispatch]);

    return (
      <div className="details">
        {
            loading ?
            <div className='allDetails'>
                <h6 className='idDetails'>{details.id}</h6>
                <h1 className='nameDetails'>{details.name}</h1>
                <div>
                    <img className='imgDetails' src={details.image} alt='Image Not Found' width='200px' height='250px'></img>
                    <hr className='hr'></hr>
                    <h1 className='typesD'>Types</h1>
                    {
                        details.type?.map(i => (
                            <h3>{i}</h3>
                        ))
                    }
                    <hr className='hr'></hr>
                    <div className='stadistics'>
                        <h1>Statistics</h1>
                        <h4>Life: {details.life}</h4>
                        <h4>Force: {details.force}</h4>
                        <h4>Defense: {details.defense}</h4>
                        <h4>Speed: {details.speed}</h4>
                    </div>
                    <hr className='hr'></hr>
                    <h3>Height: {details.height}</h3>
                    <h3>Weight: {details.weight}</h3>
                </div>
            </div> :
            <div>Loading</div>
        }
      </div>
    );
  };
  
  export default Details;