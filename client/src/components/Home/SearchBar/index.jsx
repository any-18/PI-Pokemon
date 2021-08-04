import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getbyName } from '../../../actions/index.jsx';
import './searchBar.css';

function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getbyName(name))
    };

    return(
        <div className='searcBar'>
            <input
                className='input'
                type='text'
                placeholder='Pokemon...'
                onChange={e => handleChange(e)} 
            ></input>
            <button
                className='buttonSearch'
                type='submit'
                onClick={e => handleSubmit(e)}
            >Buscar</button>
        </div>
    );
};

export default SearchBar;