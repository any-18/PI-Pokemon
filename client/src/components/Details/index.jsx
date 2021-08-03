import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../../actions/index.jsx';

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
      <div className="App">
        {
            loading ?
            <div>
                <h4>{details.id}</h4>
                <h2>{details.name}</h2>
                <div>
                    <img src={details.image} alt='Image Not Found' width='200px' height='250px'></img>
                    <h3>Types</h3>
                    {
                        details.type?.map(i => (
                            <h5>{i}</h5>
                        ))
                    }
                    <h3>Statistics</h3>
                    <h5>{details.life}</h5>
                    <h5>{details.force}</h5>
                    <h5>{details.defense}</h5>
                    <h5>{details.speed}</h5>
                    <h3>{details.height}</h3>
                    <h3>{details.weight}</h3>
                </div>
            </div> :
            <div>Loading</div>
        }
      </div>
    );
  };
  
  export default Details;