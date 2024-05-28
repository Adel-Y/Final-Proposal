import React, {useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import DisplayItem from "./DisplayItem";




const DropZone = () => {
    let [droppedItems, setDroppedItems] = useState([]);
    useEffect(()=> console.log(droppedItems),[droppedItems]);



    const [{ isOver,currentItem }, drop] = useDrop(() => ({
        accept: ['ER_item','DS_item'],
        drop (item,monitor){
            if(item.type==='ER_item') {
                let x = monitor.getClientOffset().x; //left
                let y = monitor.getClientOffset().y;// top
                setDroppedItems((prevItems) => [...prevItems, {id:idGenerator(),name: item.name,type:item.type, x: x, y:y, timestamp:new Date().getTime()}]);

            }
            let temp = monitor.getItem()
            console.log(temp)
            if(temp.type==='DS_item' ) {


                let left = monitor.getClientOffset().x;
                let top = monitor.getClientOffset().y;
                //let time = new Date().getTime()

                updatePosition(temp,left,top)

            }

            },
        collect: (monitor) => ({
             isOver: !!monitor.isOver(),


        }),
    }));




    function idGenerator(){
        return (new Date().getTime() * Math.random())
    }


    const RemoveItem = (item) => {

        setDroppedItems (droppedItems.filter(a =>
            a.id !== item.id
        )
       )
    };

    const RemoveByTime = (item) => {

        setDroppedItems (droppedItems.filter(a =>
                a.timestamp !== item.timestamp
            )
        )
    };

    function updatePosition(victim, left,top) {


        setDroppedItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.id === victim.id);
            if (existingItemIndex !== -1) {
                console.log("Updating: "+ victim.id)

                // Update the existing item
                victim.x=left;
                victim.y=top;
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = { ...prevItems[existingItemIndex], ...victim };
                return updatedItems;
            } else {
                // Add the new item
                return [...prevItems, victim];
            }
        });


    }




    return (
        <>
        <div
            ref={drop}
            id='drop-zone'
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
            }}>

            {droppedItems.map((item) => (
                <DisplayItem id={item.id} name={item.name} key={idGenerator()} handleClick={()=> RemoveItem(item)} y={item.y} x={item.x} timestamp={item.timestamp}/>


            ))}

            <p style={{
                // make this not visible
            }}>Drop here</p>

        </div>

        </>
    );
};

export default DropZone;