import React from 'react';

const Entity = ({name,handleClick}) => {

    const ItemType = 'Entity'

    return (
        <>
            <div
                className= 'entity'
            >

            <span className={'entity-button'} onClick={handleClick}>
                x
            </span>

                <p className={'entity-text'}>{ItemType}</p>

            </div>

        </>
    );
};

export default Entity;