import React from 'react';
import { useDrag } from 'react-dnd';
import DraggableItem from './Entity'

const DisplayItem = ({name, id ,handleClick}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'DS_item',
        item: { name ,type:'DS_item'},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    function tester() {

        console.log('Kos Omma Ahwe');
    }

    return (

        <div
            // key= {id.toString()+'hi'}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                margin: '5px',
                width: '100px',
                height: '50px',
                backgroundColor: 'lightblue',
            }}>
            {name}
            <button onClick={handleClick}>
                Remove
            </button>
        </div>
    );
};

export default DisplayItem;