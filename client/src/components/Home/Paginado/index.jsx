import React from 'react';
import './paginado.css'

function Paginado({pokePage, allpokes, paginado}) {
    
    const pageNumbers = [];
    for(var i = 1; i <= Math.ceil(allpokes / pokePage); i++) {
        pageNumbers.push(i)
    };

    return(
        <nav>
            <ul className='paginado'>
                {
                    pageNumbers &&
                    pageNumbers.map(i => (
                        <li className='number' key={i}>
                            <a onClick={() => paginado(i)}>{i}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Paginado;