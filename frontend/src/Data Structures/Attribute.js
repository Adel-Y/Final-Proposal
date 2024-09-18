import React, {useCallback,useState,useEffect} from 'react';
import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";
import axios from "axios";

const Attribute = ({ data, isConnectable,onDragStart}) => {


    const id =useNodeId()

    const innerAttributeClass = `attribute ${
        data?.attributeType === 'multi-value' ? 'multi-value' :
           // data?.attributeType === 'derived-attribute' ? 'derived-attribute' :
           //      data?.attributeType === 'composite' ? 'composite-attribute' :
                    ''
    }`.trim();

    const outerAttributeClass = `attribute-background ${
         data?.attributeType === 'single-value' ? 'single-value' :
            data?.attributeType === 'derived-attribute' ? 'derived-attribute' :
                data?.attributeType === 'composite' ? 'composite-attribute' :
                    ''
    }`.trim();

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
            <div className={outerAttributeClass} style={{
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

                {data?.attributeType === 'composite' && ( <div>

                    <Handle style={
                        {
                            width : '7px',
                            height: '7px',
                            marginLeft: '35px',
                            backgroundColor: 'darkred'
                        }
                    }  type="target" position={Position.Bottom} id="e" isConnectable={isConnectable} />
                    <Handle style={
                {
                    width : '7px',
                    height: '7px',
                    marginLeft: '-35px',
                    backgroundColor: 'darkred'
                }
                }  type="target" position={Position.Bottom} id="f" isConnectable={isConnectable} />

            <Handle style={
                {
                    width : '7px',
                    height: '7px',
                    marginLeft: '-35px',
                    backgroundColor: 'darkred'
                }
            }  type="target" position={Position.Top} id="g" isConnectable={isConnectable} />

            <Handle style={
                {
                    width : '7px',
                    height: '7px',
                    marginLeft: '35px',
                    backgroundColor: 'darkred'
                }
            }  type="target" position={Position.Top} id="h" isConnectable={isConnectable} />


                    </div>
                )

                }




                <div onDragStart={onDragStart}
                     draggable
                     className= {innerAttributeClass}

                >


                    <p className={`attribute-text ${data?.primaryKey ? 'primaryKey' : ''} fontTheme`}>{data?  data?.name: "Attribute"}</p>

                </div>

            </div>

        </>
    );
};

export default Attribute;