import React from 'react';

const Attribute = ({name,handleClick}) => {

    const ItemType = 'Attribute'

    return (
        <>
            <div
                className= 'attribute'
            >

            <span className={'attribute-button'} onClick={handleClick}>
                x
            </span>

                <p className={'attribute-text'}>{ItemType}</p>

            </div>

        </>
    );
};

export default Attribute;