import React from 'react';

const Linking = ({name,handleClick}) => {

    const ItemType = 'Link'

    return (
        <>
            <div
                className= {'link'}
            >
            </div>
            <span className={'entity-button'} onClick={handleClick}>
                x
            </span>

                <p className={'entity-text'}>{ItemType}</p>



        </>
    );
};

export default Linking;