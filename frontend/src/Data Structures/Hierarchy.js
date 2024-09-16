import React, {useCallback,useState,useEffect} from 'react';
import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";

const Hierarchy = ({ data, isConnectable,onDragStart}) => {


    const id =useNodeId()

    const { setNodes } = useReactFlow();

    return (
        <>
            <NodeToolbar >


                <button onClick={() => {
                    setNodes((es) => es.filter((e) => e.id !==id ));}}>
                    delete</button>


                <button >style</button>
            </NodeToolbar>
            {/*<div className='hierarchy' style={{*/}
            {/*    backgroundColor: data?.color*/}
            {/*}}>*/}

                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }
                        type="target" position={Position.Top} id="c" isConnectable={isConnectable} />



                <Handle style={
                    {
                        width : '7px',
                        height: '7px'
                    }
                }  type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />


                <div onDragStart={onDragStart}
                     draggable
                     className= {`hierarchy ${data?.weak ? 'weak' : ''}`}
                     style={{
                         backgroundColor: data?.color
                     }}
                >


                    {/*<p className={'entity-text'}>{data?  data?.name: "Entity"}</p>*/}

                </div>

            {/*</div>*/}

        </>
    );
};

export default Hierarchy;