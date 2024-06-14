import React from 'react';
import { useDrag } from 'react-dnd';
import {useEffect} from 'react';
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "./Itemtypes";
const DisplayItem = ({name, id ,handleClick, x, y,timestamp}) => {

    const [{ isDragging,isDropped }, drag, preview] = useDrag(() => ({
        type: 'DS_item',
        item: {id: id, name ,type:'DS_item' , x , y,timestamp},
        end(item,monitor){
            let dropResult = monitor.getItem()
            console.log(deriveStyle())
            //console.log(dropResult)
            },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            isDropped: monitor.didDrop()
        }),
    })

    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    // function tester() {
    //
    //     console.log('Kos Omma Ahwe');
    // }



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
<>
        <div
            ref={drag}

            className= {deriveStyle()}

            style={
            {
                opacity: isDragging ? 0.5 : 1,
                left: x +'px',
                top: y+'px'
            }
            }
        >


            <span className={deriveStyle(name)+'-button'} onClick={handleClick}>
                x
            </span>

           <p className={deriveStyle(name)+'-text'}>{name}</p>

        </div>

            </>
    );
};

export default DisplayItem;