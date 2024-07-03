import React from 'react';
import { useDrag } from 'react-dnd';
import {ItemTypes} from "./Itemtypes";


const DragItem = ({ItemType}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ER_item',
        item: { ItemType ,type:'ER_item'},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    function deriveStyle(){

        switch (ItemType){
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
            case ItemTypes.LINK:
                return 'link';

        }
    }

    return (
        <div
            ref={drag}
            className={deriveStyle()+'-drag-item'}
        >
            <p   className={deriveStyle()+'-drag-item-text'}>{ItemType}</p>
        </div>
    );
};

export default DragItem;