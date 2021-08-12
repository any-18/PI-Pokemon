import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../../actions/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import './addPoke.css';

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
    type: []
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
      type: [
        ...input.type,
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
      type: []
    });
    history.push('/pokemons')
  };

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  return (
    <div className="createPokes">
      <Link to='/pokemons'>
        <button className='back'>Volver</button>
      </Link>
      <h1 className='pokeN'>Crea tu Pokemon</h1>
      <form className='createForm' onSubmit={e => {handleSubmit(e)}}>
        <div className='labels'>
          <label>Nombre:</label>
        </div>  
          <input className='box' type='text' value={input.name} name='name'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>life:</label>
        </div>  
          <input className='box' type='text' value={input.life} name='life'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>force:</label>
        </div>  
          <input className='box' type='text' value={input.force} name='force'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>defense:</label>
        </div>  
          <input className='box' type='text' value={input.defense} name='defense'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>speed:</label>
        </div>  
          <input className='box' type='text' value={input.speed} name='speed'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>height:</label>
        </div>  
          <input className='box' type='text' value={input.height} name='height'
            onChange={e => handleChange(e)}>  
          </input>
        <div className='labels'>
          <label>weight:</label>
        </div>  
          <input className='box' type='text' value={input.weight} name='weight'
            onChange={e => handleChange(e)}>  
          </input>             
        <select className='box' onChange={e => handleSelect(e)}>
          {
            types?.map(i => (
              <option key={i.id} value={i.name}>{i.name}</option>
            ))
          }
            <ul>
              <li>{input.type.map(i => i + ", ")}</li>
            </ul>
        </select>
        <button className='buttonP' type='submit'>Crear Pokemon</button>  
      </form>      
    </div>
  );
};
  
export default AddPokemon;