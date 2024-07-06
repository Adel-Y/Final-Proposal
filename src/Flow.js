import React, {useMemo} from 'react';
import ReactFlow, {
    Background, Controls, applyEdgeChanges, applyNodeChanges,
    addEdge, Handle, Position, MiniMap, useNodesState, useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import TextUpdaterNode from "./TextUpdaterNode";
import CustomEdge from "./CustomEdge";

const handleStyle = { left: 10 };



const nodeTypes = { 'textUpdater': TextUpdaterNode };
const edgeTypes = { 'custom-edge': CustomEdge };

const initialNodes = [
    { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
    { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
    { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
];

const initialEdges = [
    { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
    { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
];

const Flow = () => {



    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    // const onNodesChange = useCallback(
    //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    //     [],
    // );
    // const onEdgesChange = useCallback(
    //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    //     [],
    // );

    const onConnect = useCallback(
        (connection) => {
            const edge = { ...connection, type: 'custom-edge' };
            setEdges((eds) => addEdge(edge, eds));
        },
        [setEdges],
    );
    return (
        <>
            <div style={{ height: '100%' }}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    fitView
                    onConnect={onConnect}
                >
                    <Background />
                    <Controls />
                    <MiniMap/>
                </ReactFlow>
            </div>

        </>
    );
};

export default Flow;