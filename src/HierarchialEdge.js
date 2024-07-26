import {
    BaseEdge,
    EdgeLabelRenderer, getBezierPath, getSmoothStepPath,
    getStraightPath,
    useReactFlow,
} from 'reactflow';
import {useState} from "react";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, data }) {
    const [isLabelVisible, setIsLabelVisible] = useState(false);

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
                // markerEnd={markerEnd}
            />


        </>
    );
}