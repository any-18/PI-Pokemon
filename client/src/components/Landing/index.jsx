import { Link } from 'react-router-dom';
import image from './any.png';
import './landing.css';

function Landing() {
    return(
        <div className='buttonLanding'>
            <img className='imgLanding' src={image} alt='Imagen Not Found'></img>
            <Link to='/pokemons'>
                <button>WELCOME</button>
            </Link>
        </div>
    );
};

export default Landing;