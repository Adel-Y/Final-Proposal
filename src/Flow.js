import React, {useMemo, useRef} from 'react';
import ReactFlow, {
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    Handle,
    Position,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import TextUpdaterNode from "./TextUpdaterNode";
import CustomEdge from "./CustomEdge";
import './index.css';
import Entity from "./Data Structures/Entity";
import Sidebar from "./Sidebar";
import entity from "./Data Structures/Entity";
import Relationship from "./Data Structures/Relationship";




//const nodeTypes = { 'textUpdater': TextUpdaterNode, 'entity-node': Entity };
const edgeTypes = { 'custom-edge': CustomEdge };

const initialNodes = [];

// const initialNodes = [
//     {
//         id: '1',
//         type: 'input',
//         data: { label: 'input node' },
//         position: { x: 250, y: 5 },
//     },
// ];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {



    const nodeTypes = useMemo(
        () => ({
            Entity: Entity,
            Relationship: Relationship
        }),
        [],
    );
    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();






    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);

    // the passed handler has to be memoized, otherwise the hook will not work correctly
    const onChange = useCallback(({ nodes, edges }) => {
        setSelectedNodes(nodes.map((node) => node));
       // console.log(selectedNodes)
        setSelectedEdges(edges.map((edge) => edge.id));
    }, [])
    // console.log(selectedNodes)
    useOnSelectionChange({
        onChange

    });


    function updateNode(victim, data) {

        setNodes((nds) =>
            nds.map((node) => {

                if (node.id === victim[0].id) {
                    console.log('I entered')
                    // it's important that you create a new node object
                    // in order to notify react flow about the change
                    return {
                        ...node,
                        data: data,
                    };
                }

                return node;
            }),
        );

    }





    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],

        console.log(edges)
    );




    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('itemDropped');

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
                data: { label: `${type} node` , name:`${type}`},
            };
            event.dataTransfer.setData('test', newNode.data);

            setNodes((nds) => nds.concat(newNode));
            console.log(nodes)
            console.log(event.dataTransfer.getData('itemDropped'))
        },
        [screenToFlowPosition],
    );


    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}

                >
                    <Background/>
                    <MiniMap/>
                    <Controls />
                </ReactFlow>

                <Sidebar node={selectedNodes} updateNode={updateNode}/>

            </div>

        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);