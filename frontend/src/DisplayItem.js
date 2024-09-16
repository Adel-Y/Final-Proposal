import React from 'react';
import { useDrag } from 'react-dnd';
import {useEffect} from 'react';
import {getEmptyImage} from "react-dnd-html5-backend";
import {ItemTypes} from "./Itemtypes";
import Entity from "./Data Structures/Entity";
import Linking from "./Data Structures/Linking";
import Relationship from "./Data Structures/Relationship";
import WeakRelationship from "./Data Structures/WeakRelationship";
import WeakEntity from "./Data Structures/WeakEntity";
import Attribute from "./Data Structures/Attribute";
const DisplayItem = ({name, id ,handleClick, x, y,timestamp, ItemType}) => {

    const [{ isDragging,isDropped }, drag, preview] = useDrag(() => ({
        type: 'DS_item',
        item: {id: id, name ,type:'DS_item' , x , y,timestamp},
        end(item,monitor){
            let dropResult = monitor.getItem()
            // console.log(deriveStyle())
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



        function deriveItem(){

        switch (ItemType){

            case ItemTypes.ENTITY:
                console.log()
                console.log(name)
                return  <Entity name={name} handleClick={handleClick} x={x} y={y}/>;

            case ItemTypes.WEAK_ENTITY:
                return <WeakEntity name={name} handleClick={handleClick} x={x} y={y}/>;

            case ItemTypes.RELATIONSHIP:
                return <Relationship name={name} handleClick={handleClick} x={x} y={y}/>;

            case ItemTypes.WEAK_RELATIONSHIP:
                return  <WeakRelationship name={name} handleClick={handleClick} x={x} y={y}/>;

            case ItemTypes.ATTRIBUTE:
                return <Attribute name={name} handleClick={handleClick} x={x} y={y}/>;
            case ItemTypes.LINK:
                return <Linking name={name} handleClick={handleClick} x={x} y={y}/>;

        }
        }




    return (
<>
    <div ref={drag}
        style={
            {
                opacity: isDragging ? 0.5 : 1,
                left: x +'px',
                top: y+'px',
                position: 'absolute',
                cursor: 'grab',
                userSelect: 'none',
            }
        }>

    {deriveItem()}
    </div>

            </>
    );
};

export default DisplayItem;