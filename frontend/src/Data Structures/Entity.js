import React, {useCallback,useState,useEffect} from 'react';
import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";
import axios from "axios";

const Entity = ({ data, isConnectable,onDragStart}) => {


    const id =useNodeId()

    const { setNodes } = useReactFlow();

    const [backData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <>
            <NodeToolbar >


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
        <div className='entity-background' style={{
            backgroundColor: data?.color
        }}>

            <Handle style={
                {
                    width : '7px',
                    height: '7px',
                    backgroundColor: 'darkred'
                }
            }
                    type="target" position={Position.Top} id="c" isConnectable={isConnectable} />

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
                    height: '7px',
                    backgroundColor: 'darkred'
                }
            }  type="target" position={Position.Bottom} id="b" isConnectable={isConnectable} />

            <Handle style={
                {
                    width : '7px',
                    height: '7px'
                }
            }  type="source" position={Position.Right} id="d" isConnectable={isConnectable} />
            <div onDragStart={onDragStart}
                draggable
                className= {`entity ${data?.weak ? 'weak' : ''}`}
                 style={{
                     backgroundColor: data?.color
                 }}
            >


                <p className={'entity-text fontTheme'}>{data?  data?.name: "Entity"}</p>

            </div>

        </div>

        </>
    );
};

export default Entity;