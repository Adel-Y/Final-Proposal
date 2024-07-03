import React, {useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import DisplayItem from "./DisplayItem";
import {ItemTypes} from "./Itemtypes";
import Linking from "./Data Structures/Linking";




const DropZone = () => {
    let [droppedItems, setDroppedItems] = useState([]);
    useEffect(()=> console.log(droppedItems),[droppedItems]);

    let [droppedLinks, setDroppedLinks] = useState([]);
    useEffect(()=> console.log(droppedLinks),[droppedLinks]);



    const [{ isOver,currentItem }, drop] = useDrop(() => ({
        accept: ['ER_item','DS_item','Link','LinkDS'],
        drop (item,monitor){

            let temp = monitor.getItem()
            console.log(temp)
            // console.log(isFound(droppedLinks,temp))
            if(item.type==='ER_item') {
                let x = monitor.getClientOffset().x; //left
                let y = monitor.getClientOffset().y;// top
                setDroppedItems((prevItems) => [...prevItems, {id:idGenerator(),ItemType: item.ItemType,type:temp.type, x: x, y:y, timestamp:new Date().getTime()}]);

            }

            // if(item.type===ItemTypes.LINK && temp.id==null){
            //     let x = monitor.getClientOffset().x; //left
            //     let y = monitor.getClientOffset().y;// top
            //     setDroppedLinks((prevLinks) => [...prevLinks, {id:idGenerator(),name: item.name,type:"Link", x: x, y:y, timestamp:new Date().getTime()}]);
            // }
            // if(item.type===ItemTypes.LINK && temp.id!==null){
            //     let left = monitor.getClientOffset().x;
            //     let top = monitor.getClientOffset().y;
            //
            //     updatePosition(temp,left,top)
            // }

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

    const isFound = (prevLinks,target) => {

        const existingItemIndex = prevLinks.findIndex(item => item.id === target.id);
        if (existingItemIndex !== -1) {
            console.log("found: "+ target.id)

            // Update the existing item
            return true;
        } else {
            // Add the new item
            return false;
        }




        // const containsObject = prevLinks.some(item => JSON.stringify(item) === JSON.stringify(target));
        //
        // return containsObject;

        // const x = prevLinks.includes(target);
        // return x;
        // const existingItemIndex = prevLinks.findIndex(item => item.id === target.id);
        //     if(existingItemIndex === -1){
        //         return false
        //     }
        //     return true

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

                <DisplayItem id={item.id} ItemType={item.ItemType} key={idGenerator()} handleClick={()=> RemoveItem(item)} y={item.y} x={item.x} timestamp={item.timestamp}/>
            ))}


            {!(droppedItems.length==0)? null : <p className="box-text">Drop here</p> }


        </div>

        </>
    );
};

export default DropZone;