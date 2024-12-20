import {
    BaseEdge,
    EdgeLabelRenderer, getBezierPath, getSmoothStepPath,
    getStraightPath,
    useReactFlow,
} from '@xyflow/react';
import React, {useState} from "react";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import axios from "axios";
import {ReactFlowProvider} from "@xyflow/react";

const  AttributeEdge=({ id, sourceX, sourceY, targetX, targetY, data })=> {
    const [isLabelVisible, setIsLabelVisible] = useState(false);

    const [apiData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    const handleEdgeClick = () => {
        setIsLabelVisible(true);
    };

    const handleEdgeBlur = () => {
        setIsLabelVisible(false);
    };

    return (
        <>
            <path
                id={`${id}-interaction`}
                d={edgePath}
                fill="none"
                stroke="transparent"
                strokeWidth={25}
                onMouseOver={handleEdgeClick}
                onMouseLeave={handleEdgeBlur}
                className="interaction-path"
            >


                <EdgeLabelRenderer>
                    <div                         style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                        cursor:'pointer'
                    }} className="nodrag nopan">
                        {isLabelVisible && (
                            <button
                                style={{
                                    cursor:'pointer'
                                }}
                                onClick={() => {
                                    axios.delete(`/connect/edges/${id}`)
                                        .then(response => {
                                            console.log(response)
                                            setData(response.data);
                                            setLoading(false);
                                        })
                                        .catch(error => {
                                            setError(error);
                                            setLoading(false);
                                        });
                                    setEdges((es) => es.filter((e) => e.id !== id));
                                }}
                            >
                                delete
                            </button>

                        )
                        }
                    </div>
                </EdgeLabelRenderer>)

            </path>

            <path
                id={id}
                className="attribute-edge-path"
                d={edgePath}
                fill='none'
                // markerEnd={markerEnd}
            />


        </>
    );
}
export default AttributeEdge