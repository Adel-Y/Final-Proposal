import React, {useState} from 'react';
import './App.css'
import 'reactflow/dist/style.css';
import '@xyflow/react/dist/style.css';
import Entity from "./Data Structures/Entity";
import {ReactFlowProvider} from "@xyflow/react";
import Relationship from "./Data Structures/Relationship";
import Attribute from "./Data Structures/Attribute";
import Hierarchy from "./Data Structures/Hierarchy";
import Interface from "./Data Structures/Interface";
import EntityCrow from "./Data Structures/EntityCrow";

const NodeSelector = ({ onChange,defaultValue }) => (
    <select onChange={onChange} defaultValue={defaultValue}>
        <option value="chen">Chen</option>
        <option value="crow">Crow's Foot</option>
    </select>
);

const Pallet= ({setNotationStyle,initialNotation}) => {

    console.log(initialNotation)

    // const [notation,setNotation]=useState('chen')

    const handleSetChange = (event) => {
        setNotationStyle(event.target.value)
        // setNotation(event.target.value);

    };


    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('itemDropped', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };


    return (
<>
        <div className='pallet'>
            <h4 className='fontTheme'>Drag Items</h4>
            <label>Choose Node Set:
            <NodeSelector onChange={handleSetChange} defaultValue={initialNotation}/>
            </label>

            {initialNotation==="chen" && (
                <>
                <Entity onDragStart={(event) => onDragStart(event, 'Entity')} />

                <Relationship onDragStart={(event) => onDragStart(event, 'Relationship')} />

                <Attribute onDragStart={(event)=>onDragStart(event,'Attribute')} />

                <Interface onDragStart={(event)=>onDragStart(event,'Interface')} />
                </>
            )}
            {initialNotation==="crow" && (
                <>
                    <EntityCrow onDragStart={(event)=>onDragStart(event,'entityNode')}/>
                    {/*<div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>*/}
                    {/*    Input Node*/}
                    {/*</div>*/}
                    {/*<div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>*/}
                    {/*    Default Node*/}
                    {/*</div>*/}
                    {/*<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>*/}
                    {/*    Output Node*/}
                    {/*</div>*/}
                </>
            )}

            {/*<Hierarchy onDragStart={(event)=>onDragStart(event,'Hierarchy')} />*/}

            {/*<div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>*/}
            {/*    Input Node*/}
            {/*</div>*/}
            {/*<div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>*/}
            {/*    Default Node*/}
            {/*</div>*/}
            {/*<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>*/}
            {/*    Output Node*/}
            {/*</div>*/}
        </div>
</>
    );
};

export default Pallet