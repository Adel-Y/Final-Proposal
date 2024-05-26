import React, {useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import DisplayItem from "./DisplayItem";
const DropZone = () => {



    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['ER_item','DS_item'],
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    let [droppedItems, setDroppedItems] = useState([]);
    useEffect(()=> console.log(droppedItems),[droppedItems]);


    function idGenerator(){
        return (new Date().getTime() * Math.random())
    }




    const handleDrop = (item) => {
        if(item.type==='ER_item') {
            setDroppedItems((prevItems) => [...prevItems, {id:idGenerator(),name: item.name,type:item.type}]);
        }
        console.log(item.id);
      };
    const RemoveItem = (item) => {
        const updatedItems = [];

        for (let i=0;i<droppedItems.length;i++){
            if (droppedItems[i].id !== item.id) {
                updatedItems.push(droppedItems[i]);
            }
        }
        setDroppedItems(updatedItems);
    };

    function tester() {

        console.log('Kos Omma Ahwe');
    }


    return (
        <div
            ref={drop}
            id='drop-zone'
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
            }}>
                            {droppedItems.map((item) => (
                                    <DisplayItem name={item.name} key={idGenerator()} handleClick={()=> RemoveItem(item)}/>


                            ))}
            Drop here
        </div>
    );
};

export default DropZone;