import React from 'react';

function Paginado({pokePage, allpokes, paginado}) {
    
    const pageNumbers = [];
    for(var i = 1; i <= Math.ceil(allpokes / pokePage); i++) {
        pageNumbers.push(i)
    };

    return(
        <nav>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(i => (
                        <li key={i}>
                            <a onClick={() => paginado(i)}>{i}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Paginado;