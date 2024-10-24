import React, { useCallback, useState } from 'react';
import { Handle, Position, useNodeId, useReactFlow } from '@xyflow/react';
import '../EntityNode.css'; // Custom styles for the entity node

const EntityCrow = ({ data = { label: "Default Label", attributes: [] }, isConnectable, onDragStart }) => {
    // Provide default values to prevent errors
    const label = data?.label || "Default Label";
    const [attributes, setAttributes] = useState(data?.attributes || []);
    const id = useNodeId();
    const { setNodes } = useReactFlow();

    // Add Attribute Function
    const addAttribute = useCallback(() => {
        const newAttribute = 'Attribute';
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    const updatedAttributes = [...node.data.attributes, newAttribute];
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
    }, [setNodes, id]);

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

    return (
        <div className="entity-node" onDragStart={onDragStart}>
            <div className="entity-title">
                <strong>{label}</strong>
            </div>
            <div key={id} className="attribute-list">
                {attributes.length > 0 && (
                    <div>
                        {attributes.map((attr, index) => (
                            <div key={index} className="attribute-item">
                                {attr}
                                <button onClick={() => handleRemoveAttribute(id, index)} className="remove-attribute-button">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button className="add-attribute-button" onClick={addAttribute}>
                Add Attribute
            </button>
            {/* Handles to represent relationships (Crow's Foot notation) */}
            <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
            <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
        </div>
    );
};

export default EntityCrow;
