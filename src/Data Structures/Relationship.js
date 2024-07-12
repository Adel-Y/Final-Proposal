import React from 'react';

import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";
const Relationship = ({ data, isConnectable,onDragStart}) => {

    const ItemType = 'Relationship'
    const id =useNodeId()

    const { setNodes } = useReactFlow();
    return (
        <>
            <NodeToolbar style={{
                marginTop: '-30px',
            }} >


                <button onClick={() => {
                    setNodes((es) => es.filter((e) => e.id !==id ));}}>
                    delete</button>


                <button >style</button>
            </NodeToolbar>

            <div className='relationship-background'>

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginLeft: '35px'
                    }
                }
                        type="target" position={Position.Top} id="c" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginTop: '-35px'
                    }
                }
                        type="target"
                        position={Position.Left}
                        id="a"
                        isConnectable={isConnectable}
                />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginLeft: '-35px'
                    }
                }  type="target" position={Position.Bottom} id="b" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginTop: '35px'
                    }
                }  type="target" position={Position.Right} id="d" isConnectable={isConnectable} />
                <div onDragStart={onDragStart}
                     draggable
                     className= {`relationship ${data?.weak ? 'weak' : ''}`}

                >


                    <p className={'relationship-text'}>{data?  data?.name: "Relationship"}</p>

                </div>

            </div>


        </>
    );
};

export default Relationship;