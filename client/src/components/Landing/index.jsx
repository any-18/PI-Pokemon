import { Link } from 'react-router-dom';

function Landing() {
    return(
        <div>
            <h2>POKE API</h2>
            <Link to='/pokemons'>
                <button>WELCOME</button>
            </Link>
        </div>
    );
};

export default Landing;