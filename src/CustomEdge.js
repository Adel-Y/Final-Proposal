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
                {/*<EdgeLabelRenderer>*/}
                {/*    <p className="nodrag nopan">Hello</p>*/}
                {/*</EdgeLabelRenderer>*/}
                {isLabelVisible && (
                <EdgeLabelRenderer>
                    <button
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                            cursor:'pointer'
                        }}
                        className="nodrag nopan"
                        onClick={() => {
                            setEdges((es) => es.filter((e) => e.id !== id));
                        }}
                    >
                        delete
                    </button>
                </EdgeLabelRenderer>
            )
            }
            </path>

            <path
                id={id}
                className="custom-edge-path"
                d={edgePath}
                // markerEnd={markerEnd}
            />



        </>
    );
}
