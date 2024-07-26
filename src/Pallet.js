import React from 'react';
import './App.css'
import 'reactflow/dist/style.css';
import Entity from "./Data Structures/Entity";
import {ReactFlowProvider} from "reactflow";
import Relationship from "./Data Structures/Relationship";
import Attribute from "./Data Structures/Attribute";
import Hierarchy from "./Data Structures/Hierarchy";
const Pallet= () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('itemDropped', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <ReactFlowProvider>
        <div className='pallet'>
            <h4>Drag Items</h4>

            <Entity onDragStart={(event) => onDragStart(event, 'Entity')} />

            <Relationship onDragStart={(event) => onDragStart(event, 'Relationship')} />

            <Attribute onDragStart={(event)=>onDragStart(event,'Attribute')} />

            <Hierarchy onDragStart={(event)=>onDragStart(event,'Hierarchy')} />

            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
        </div>
        </ReactFlowProvider>
    );
};

export default Pallet