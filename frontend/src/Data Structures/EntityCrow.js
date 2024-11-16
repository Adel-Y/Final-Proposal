import React, { useCallback, useState } from 'react';
import {Handle, NodeToolbar, Position, useNodeId, useReactFlow} from '@xyflow/react';
import '../EntityNode.css';
import axios from "axios"; // Custom styles for the entity node

const EntityCrow = ({ data  , isConnectable, onDragStart }) => {
    // Provide default values to prevent errors
    const label = data?.label || "Default Label";
    const [attributes, setAttributes] = useState(data?.attributes);
    const id = useNodeId();
    const {nodes, setNodes } = useReactFlow();





    const updateNodeAttributes = async (addedAttribute) => {
        axios.put(`/test/nodes/attributes/${id}`, addedAttribute)
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    };


    // Add Attribute Function
    const addAttribute = useCallback(() => {
        //const newAttribute = {attribute:'Attribute'};
        const newAttribute = {attribute:{name:'Attribute'}};
        let updatedAttributes =[]

       setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                      updatedAttributes.push(newAttribute.attribute);
                     // console.log(updatedAttributes)
                    updateNodeAttributes(newAttribute)
// updatedAttributes.push(newAttribute.attribute)
                    setAttributes(updatedAttributes)
                    console.log(attributes)
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            attributes: updatedAttributes,
                        },
                    };
                }
                return node;
            })
        );
        console.log(id)
        //console.log(x)
        console.log(updatedAttributes)
        console.log(attributes)


    }, [setNodes]);

    // Remove Attribute Function
    const handleRemoveAttribute = useCallback((nodeId, attrIndex) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    const updatedAttributes = [...node.data.attributes];
                    updatedAttributes.splice(attrIndex, 1);
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            attributes: updatedAttributes,
                        },
                    };
                }
                return node;
            })
        );



    }, [setNodes]);

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
        <div className="entity-node" onDragStart={onDragStart}>
            <div className="entity-title">
                <strong>{label}</strong>
            </div>
            <div key={id} className="attribute-list">
                {data?.attributes?.length >0  ? (
                    <div>
                        {data?.attributes.map((attr, index) => (
                            <div key={index} className="attribute-item">
                                {attr.name}
                                <button onClick={() => handleRemoveAttribute(id, index)} className="remove-attribute-button">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                ):(<div></div>)}
            </div>
            <button className="add-attribute-button" onClick={addAttribute}>
                Add Attribute
            </button>
            {/* Handles to represent relationships (Crow's Foot notation) */}
            <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
            <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
        </div>
        </>
    );
};

export default EntityCrow;
