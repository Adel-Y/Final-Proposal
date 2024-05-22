import React from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import DraggableItem from './Entity'
const DropZone = () => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ER_item',
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));


    const [droppedItems, setDroppedItems] = useState([]);

    const handleDrop = (item) => {
          setDroppedItems((prevItems) => [...prevItems, item]);
      };
    
      const handleRemoveItem = (index) => {
          const updatedItems = [...droppedItems];
          updatedItems.splice(index, 1);
          setDroppedItems(updatedItems);
      };


    return (
        <div
            ref={drop}
            className='drop-zone'
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
            }}>
                            {droppedItems.map((item, index) => (
                                <div
                                    key={index}
                                    draggable

                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '30px',
                                        borderRadius: '5px',
                                        marginTop: '10px',
                                        backgroundColor: 'lightblue',
                                         display: 'flex',
                                         justifyContent: 'space-between',
                                         alignItems: 'center',
                                    }}>
                                    <p>{item.name}</p>
                                    <button onClick={
                                        () => handleRemoveItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
            Drop here
        </div>
    );
};

export default DropZone;