import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from 'reactflow';
import {useState} from "react";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, data }) {
    const [isLabelVisible, setIsLabelVisible] = useState(false);

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
            case 'one-to-one':
                return '(1,1)';
            case 'one-to-many':
                return '(1,N)';
            case 'many-to-one':
                return '(N,1)';
            case 'many-to-many':
                return '(M,N)';
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
