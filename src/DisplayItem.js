import React from 'react';
import { useDrag } from 'react-dnd';
import {useEffect} from 'react';
import {getEmptyImage} from "react-dnd-html5-backend";
const DisplayItem = ({name, id ,handleClick, x, y,timestamp}) => {

    const [{ isDragging,isDropped }, drag, preview] = useDrag(() => ({
        type: 'DS_item',
        item: {id: id, name ,type:'DS_item' , x , y,timestamp},
        end(item,monitor){
            let dropResult = monitor.getItem()
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

    return (
<>
        <div
            ref={drag}
            id="draggable"

            style={
            {
                left: (x) +'px',
                top: y+'px'
            }
            }
        >
            {name}
            <button onClick={handleClick}>
                Remove
            </button>
        </div>

            </>
    );
};

export default DisplayItem;