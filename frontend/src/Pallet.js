import React from 'react';
import './App.css'
import 'reactflow/dist/style.css';
import Entity from "./Data Structures/Entity";
import {ReactFlowProvider} from "reactflow";
import Relationship from "./Data Structures/Relationship";
import Attribute from "./Data Structures/Attribute";
import Hierarchy from "./Data Structures/Hierarchy";
import Interface from "./Data Structures/Interface";
const Pallet= () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('itemDropped', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <ReactFlowProvider>
        <div className='pallet'>
            <h4 className='fontTheme'>Drag Items</h4>

            <Entity onDragStart={(event) => onDragStart(event, 'Entity')} />

            <Relationship onDragStart={(event) => onDragStart(event, 'Relationship')} />

            <Attribute onDragStart={(event)=>onDragStart(event,'Attribute')} />

            <Interface onDragStart={(event)=>onDragStart(event,'Interface')} />

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
        </ReactFlowProvider>
    );
};

export default Pallet