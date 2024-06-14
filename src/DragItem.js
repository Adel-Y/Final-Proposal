import React from 'react';
import { useDrag } from 'react-dnd';
import {ItemTypes} from "./Itemtypes";


const DragItem = ({name}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ER_item',
        item: { name ,type:'ER_item'},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    function deriveStyle(){

        switch (name){
            case ItemTypes.ENTITY:
                console.log()
                return  'entity'

            case ItemTypes.WEAK_ENTITY:
                return 'weak-entity';

            case ItemTypes.RELATIONSHIP:
                return 'relationship';

            case ItemTypes.WEAK_RELATIONSHIP:
                return'weak-relationship';

            case ItemTypes.ATTRIBUTE:
                return 'attribute';

        }
    }

    return (
        <div
            ref={drag}
            className={deriveStyle()+'-drag-item'}
            // style={{
            //     opacity: isDragging ? 0.5 : 1,
            //     cursor: 'grab',
            //     border: '1px solid #ccc',
            //     padding: '10px',
            //     borderRadius: '5px',
            //     margin: '5px',
            //     backgroundColor: 'lightblue',
            // }}
        >
            <p   className={deriveStyle()+'-drag-item-text'}>{name}</p>
        </div>
    );
};

export default DragItem;