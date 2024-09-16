import React, {useEffect, useMemo, useRef} from 'react';
import { useNodesData } from '@xyflow/react';
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
    useOnSelectionChange, StraightEdge, StepEdge, ControlButton, Panel, BackgroundVariant
} from 'reactflow';
import axios from 'axios';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import CustomEdge from "./CustomEdge";
import HierarchialEdge from "./HierarchialEdge";
import './index.css';
import Entity from "./Data Structures/Entity";
import Sidebar from "./Sidebar";
import Relationship from "./Data Structures/Relationship";
import Attribute from "./Data Structures/Attribute";
import Hierarchy from "./Data Structures/Hierarchy";
import Interface from "./Data Structures/Interface";

const initialNodes = [];


let id = 0;
const getId = () => `id-${id++}`;

const DnDFlow = () => {

    const edgeTypes = useMemo(
        () => ({
            'custom-edge': CustomEdge,
            'straight':StraightEdge,
            'hierarchy-edge': HierarchialEdge,
            'stair-edge': StepEdge
        }),
        [],
    );

    const nodeTypes = useMemo(
        () => ({
            Entity: Entity,
            Relationship: Relationship,
            Attribute: Attribute,
            Hierarchy: Hierarchy,
            Interface: Interface
        }),
        [],
    );
    // backend connection
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    //end



    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [otherNodes, setOtherNodes, onOtherNodesChange] = useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { screenToFlowPosition } = useReactFlow();


    const [selectedBackground, setSelectedBackground]= useState(BackgroundVariant.Dots);






    const [selectedElements, setSelectedElements] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);

    // the passed handler has to be memoized, otherwise the hook will not work correctly
    const onChange = useCallback(({ nodes, edges }) => {

        if(nodes.length !==0) {
            setSelectedElements(nodes.map((node) => node));
        }
       // console.log(selectedNodes)
        else {
            setSelectedElements(edges.map((edge) => edge));
        }
    }, [])
    // console.log(selectedNodes)
    useOnSelectionChange({
        onChange

    });


    function updateNode(victim, data,color) {
        console.log(color)

        if(victim[0].type ==='custom-edge') {

            setEdges((eds) =>
                eds.map((edge) => {

                    if (edge.id === victim[0].id) {
                        console.log('I entered')
                        // it's important that you create a new node object
                        // in order to notify react flow about the change
                        return {
                            ...edge,
                            data: {cardinality: data.cardinality},
                        };
                    }

                    return edge;
                }),
            );


        }
        else{

            setNodes((nds) =>
                nds.map((node) => {

                    if (node.id === victim[0].id) {
                        console.log('I entered')
                        // it's important that you create a new node object
                        // in order to notify react flow about the change
                        return {
                            ...node,
                            // style: {backgroundColor: data.color},
                            data: data,

                        };
                    }

                    return node;
                }),
            );

        }


    }




    const onConnect =
        // useCallback(
        (connection) => {
            const { source, target } = connection;
            console.log(source)
            console.log(target)
            console.log(connection)

            const sourceNode = nodes.find(node => node.id === source);

            const targetNode = nodes.find(node => node.id === target);

            console.log(sourceNode)

            if(sourceNode.type==='Attribute'){
                const edge = { ...connection, type: 'straight', data: {cardinality : 'one-to-many'} };
                setEdges((eds) => addEdge(edge, eds));
            }
            if(sourceNode.type==='Hierarchy'){
                const edge = { ...connection, type: 'hierarchy-edge', data: {cardinality : 'one-to-many'} };
                setEdges((eds) => addEdge(edge, eds));
            }
            if(sourceNode.type==='Interface' && (targetNode.type==='Entity' || targetNode.type ==='Interface')){
                const edge = { ...connection, type: 'hierarchy-edge', data: {cardinality : 'one-to-many'} };
                setEdges((eds) => addEdge(edge, eds));
            }
            else {
                const edge = {...connection, type: 'custom-edge', data: {cardinality: 'one-to-many'}};
                setEdges((eds) => addEdge(edge, eds));
            }

        }
    //     ,
    //     [setEdges],
    // );
    useEffect(()=> console.log(nodes),[nodes]);



    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const colorChooser =(type)=>{
        switch (type){
            case 'Entity':
                return 'lightyellow';
            case 'Relationship':
                return 'lightgreen';
            case 'Attribute':
                return 'lightsalmon';
            case 'Interface':
                return 'deepskyblue';

    }
    }

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

            let newNode = {};


                    if(type === 'Entity') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                weak: false,
                                color: colorChooser(type)
                            },
                        };
                    };
                    if(type === 'Relationship') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                weak: false,
                                color: colorChooser(type)
                            },
                        };
                    };
                    if(type === 'Attribute') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                primaryKey: false,
                                attributeType: 'single-value',
                                dataType: 'VARCHAR',
                                dataSize: 99,
                                color: colorChooser(type)
                            },
                        };
                    };
                    if(type === 'Hierarchy') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {
                                label: `${type} node`,
                                name: `${type}`,

                            },
                        };
                    };
                    if(type === 'Interface') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                color: colorChooser(type)
                            },
                        };
                    };




            setNodes( (nds)=>nds.concat(newNode));
            console.log(nodes)
            console.log(event.dataTransfer.getData('itemDropped'))
        },
        [screenToFlowPosition],
    );

    const setBackground =(type)=>{

                setSelectedBackground(type)


    }

    return (
        <>
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}

                >
                    <Background variant={selectedBackground}/>
                    <MiniMap/>
                    <Panel position="top-left">
                       <div className="fontTheme">
                           <button className='panel-button' onClick={()=> setBackground(BackgroundVariant.Dots)}>Dots</button>
                           <button className='panel-button' onClick={()=>setBackground(BackgroundVariant.Lines)}>Lines</button>
                           <button className='panel-button' onClick={()=>setBackground(BackgroundVariant.Cross)}>Cross</button>
                       </div>
                    </Panel>
                    {/*<ControlButton/>*/}
                    <Controls />
                </ReactFlow>

                <Sidebar node={selectedElements} edge={selectedEdges} updateNode={updateNode}/>

            </div>

        </div>
        </>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);