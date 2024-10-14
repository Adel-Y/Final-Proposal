import React, {useState} from 'react';

import {
    Handle,
    Position,
    NodeToolbar,
    useNodesState,
    Panel,
    useReactFlow,
    useNodeId,
    addEdge,
    ReactFlowProvider
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import axios from "axios";
const Relationship = ({ data, isConnectable,onDragStart}) => {

    const ItemType = 'Relationship'
    const id =useNodeId()

    const { setNodes } = useReactFlow();

    const [backData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    return (
        <>
            <NodeToolbar style={{
                marginTop: '-30px',
            }} >


                <button onClick={() => {

                    axios.delete(`/test/nodes/${id}`)
                        .then(response => {
                            console.log(response)
                            setData(response.data);
                            setLoading(false);
                        })
                        .catch(error => {
                            setError(error);
                            setLoading(false);
                        });
                    setNodes((es) => es.filter((e) => e.id !==id ));}}>
                    delete</button>


                <button >style</button>
            </NodeToolbar>

            <div className='relationship-background'  style={{
                backgroundColor: data?.color
            }}>

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginLeft: '35px',
                        backgroundColor: 'darkred'
                    }
                }
                        type="target" position={Position.Top} id="c" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginTop: '-35px',
                        backgroundColor: 'darkred'
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
                        marginLeft: '-35px',
                        backgroundColor: 'darkred'
                    }
                }  type="target" position={Position.Bottom} id="b" isConnectable={isConnectable} />

                <Handle style={
                    {
                        width : '7px',
                        height: '7px',
                        marginTop: '35px',
                        backgroundColor: 'darkred'
                    }
                }  type="target" position={Position.Right} id="d" isConnectable={isConnectable} />
                <div onDragStart={onDragStart}
                     draggable
                     className= {`relationship ${data?.weak ? 'weak' : ''}`}
                     style={{
                         backgroundColor: data?.color
                     }}

                >


                    <p className={'relationship-text fontTheme'}>{data?  data?.name: "Relationship"}</p>

                </div>

            </div>


        </>
    );
};

export default Relationship