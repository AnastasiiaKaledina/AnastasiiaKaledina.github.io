import React from 'react';
import preloader from '../../../assets/images/preload.gif'; // переменная и в ней путь к картинке

const Preloader = (props) => {
    return ( 
        <div role={'main'}>
            <img src={preloader} />
        </div>
    )
}

export default Preloader;