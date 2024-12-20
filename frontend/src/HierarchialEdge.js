import {
    BaseEdge,
    EdgeLabelRenderer, getBezierPath, getSmoothStepPath,
    getStraightPath,
    useReactFlow,
} from '@xyflow/react';
import React, {useState} from "react";
import axios from "axios";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import {useNodesData, MarkerType, ReactFlowProvider} from '@xyflow/react';
const HierarchialEdge=({ id, sourceX, sourceY, targetX, targetY, data ,markerStart}) =>{
    const [isLabelVisible, setIsLabelVisible] = useState(false);

    const [apiData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
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

    const propertyRenderer =()=>{
        switch (data?.property){
            case 'total-exclusive':
                return '(t,e)';
            case 'total-overlapping':
                return '(t,o)';
            case 'partial-exclusive':
                return '(p,e)';
            case 'partial-overlapping':
                return '(p,o)';
        }
    }

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

                markerStart={markerStart}
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
                className="hierarchial-edge-path"
                d={edgePath}
                fill='none'

               markerStart={markerStart}
            />

            <EdgeLabelRenderer>
                <div                         style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                    cursor:'pointer'
                }} className="nodrag nopan">
                    <div style={{
                        marginTop:'-30px'
                    }}><span> {propertyRenderer()}</span></div>

                </div>
            </EdgeLabelRenderer>
        </>
    );
}
export default HierarchialEdge
