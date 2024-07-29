import React, {useCallback,useState,useEffect} from 'react';
import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";

const Attribute = ({ data, isConnectable,onDragStart}) => {


    const id =useNodeId()

    const attributeClass = `attribute ${
        data?.attributeType === 'multi-value' ? 'multi-value' :
            data?.attributeType === 'derived-attribute' ? 'derived-attribute' :
                data?.attributeType === 'composite' ? 'composite-attribute' :
                    ''
    }`.trim();

    const { setNodes } = useReactFlow();

    return (
        <>
            <NodeToolbar >


                <button onClick={() => {
                    setNodes((es) => es.filter((e) => e.id !==id ));}}>
                    delete</button>


                <button >style</button>
            </NodeToolbar>
            <div className='attribute-background' style={{
                backgroundColor: data?.color
            }}>

                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }
                        type="source" position={Position.Top} id="c" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }
                        type="source"
                        position={Position.Left}
                        id="a"
                        isConnectable={isConnectable}
                />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }  type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }  type="source" position={Position.Right} id="d" isConnectable={isConnectable} />
                <div onDragStart={onDragStart}
                     draggable
                     className= {attributeClass}

                >


                    <p className={`attribute-text ${data?.primaryKey ? 'primaryKey' : ''}`}>{data?  data?.name: "Attribute"}</p>

                </div>

            </div>

        </>
    );
};

export default Attribute;