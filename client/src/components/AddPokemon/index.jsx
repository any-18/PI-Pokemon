import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../../actions/index.jsx';
import { useDispatch, useSelector } from 'react-redux';


function AddPokemon() {

  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector(e => e.types)
  const [input, setInput] = useState({
    name: '',
    life: '',
    force: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    typePokemon: []
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  function handleSelect(e) {
    setInput({
      ...input,
      typePokemon: [
        ...input.typePokemon,
        e.target.value
      ]
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input))
    alert('Tu pokemon fue creado con exito!')
    setInput({
      name: '',
      life: '',
      force: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      typePokemon: []
    });
    history.push('/pokemons')
  };

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  return (
    <div className="App">
      <Link to='/pokemons'>
        <button>Volver</button>
      </Link>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={e => {handleSubmit(e)}}>
        <div>
          <label>Nombre:</label>
            <input type='text' value={input.name} name='name'
              onChange={e => handleChange(e)}>  
            </input>
        </div>
        <div>
          <label>life:</label>
          <input type='text' value={input.life} name='life'
            onChange={e => handleChange(e)}>  
          </input>
        </div>
        <div>
          <label>force:</label>
            <input type='text' value={input.force} name='force'
              onChange={e => handleChange(e)}>  
            </input>
        </div>
        <div>
          <label>defense:</label>
            <input type='text' value={input.defense} name='defense'
            onChange={e => handleChange(e)}>  
          </input>
        </div>
        <div>
          <label>speed:</label>
            <input type='text' value={input.speed} name='speed'
            onChange={e => handleChange(e)}>  
          </input>
        </div>
        <div>
          <label>height:</label>
            <input type='text' value={input.height} name='height'
            onChange={e => handleChange(e)}>  
          </input>
        </div>
        <div>
          <label>weight:</label>
            <input type='text' value={input.weight} name='weight'
            onChange={e => handleChange(e)}>  
          </input>
        </div>                        
        <select onChange={e => handleSelect(e)}>
          {
            types.map(i => (
              <option value={i.name}>{i.name}</option>
            ))
          }
            <ul>
              <li>{input.typePokemon.map(i => i + ", ")}</li>
            </ul>
        </select>
        <button type='submit'>Crear Pokemon</button>  
      </form>      
    </div>
  );
};
  
export default AddPokemon;