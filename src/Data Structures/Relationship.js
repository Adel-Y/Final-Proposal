import React from 'react';

const Relationship = ({name,handleClick}) => {

    const ItemType = 'Relationship'

    return (
        <>
            <div
                className= 'relationship'
            >

            <span className={'relationship-button'} onClick={handleClick}>
                x
            </span>

                <p className={'relationship-text'}>{ItemType}</p>

            </div>

        </>
    );
};

export default Relationship;