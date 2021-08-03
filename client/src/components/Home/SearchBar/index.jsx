import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getbyName } from '../../../actions/index.jsx';

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
        <div>
            <input
                type='text'
                placeholder='Pokemon...'
                onChange={e => handleChange(e)} 
            ></input>
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
            >Buscar</button>
        </div>
    );
};

export default SearchBar;