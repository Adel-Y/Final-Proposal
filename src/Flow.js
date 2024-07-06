import React, {useMemo, useRef} from 'react';
import ReactFlow, {
    Background, Controls, applyEdgeChanges, applyNodeChanges,
    addEdge, Handle, Position, MiniMap, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import TextUpdaterNode from "./TextUpdaterNode";
import CustomEdge from "./CustomEdge";
import './index.css';




const nodeTypes = { 'textUpdater': TextUpdaterNode };
const edgeTypes = { 'custom-edge': CustomEdge };

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {

    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
            console.log(nodes)
        },
        [screenToFlowPosition],
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Background/>
                    <MiniMap/>
                    <Controls />
                </ReactFlow>
            </div>

        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);