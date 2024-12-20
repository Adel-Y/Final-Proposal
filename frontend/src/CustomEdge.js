import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath, ReactFlowProvider,
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';
import React, {useState} from "react";
import axios from "axios";

const CustomEdge =({ id, sourceX, sourceY, targetX, targetY, data })=> {
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

    const cardinalityRenderer =()=>{
        switch (data?.cardinality){
            case 'zero-to-one':
                return '(0,1)';
            case 'one-to-one':
                return '(1,1)';
            case 'zero-to-many':
                return '(0,N)';
            case 'one-to-many':
                return '(1,N)';
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
                onMouse
                className="interaction-path" on
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
                className="custom-edge-path"
                d={edgePath}
                // markerEnd={markerEnd}
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
                    }}><span> {cardinalityRenderer()}</span></div>

                </div>
            </EdgeLabelRenderer>

        </>
    );
}
export default CustomEdge