import React, {useEffect, useMemo, useRef} from 'react';
import {ReactFlow, MarkerType, useStoreApi} from '@xyflow/react';
import {
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
    useOnSelectionChange, StepEdge, ControlButton, Panel, BackgroundVariant
} from '@xyflow/react';
import axios from 'axios';
// import 'reactflow/dist/style.css';
//import '@xyflow/react/dist/base.css';
import '@xyflow/react/dist/style.css';
import { useState, useCallback } from 'react';
import CustomEdge from "../CustomEdge";
import StraightEdge from "../StraightEdge";
import HierarchialEdge from "../HierarchialEdge";
import '../index.css';
import Entity from "../Data Structures/Entity";
import Sidebar from "../Sidebar";
import Relationship from "../Data Structures/Relationship";
import Attribute from "../Data Structures/Attribute";
import Hierarchy from "../Data Structures/Hierarchy";
import Interface from "../Data Structures/Interface";
import AttributeEdge from "../AttributeEdge";
import EntityCrow from "../Data Structures/EntityCrow";

const initialNodes = [];
// console.log(typeof MarkerType.ArrowClosed)

const MIN_DISTANCE = 150;

let id = 1;
const getId = () => `id-${id++ * Date.now()}`;

const DnDFlow = ({initialNotation}) => {

    useEffect(()=>{
        console.log(initialNotation)
    },[initialNotation])


    const crowEdgeTypes =[];
    const crowNodeTypes=useMemo(
        () => ({
            entityNode: EntityCrow,
        }),
        [],
    );;

    const chenEdgeTypes = useMemo(
        () => ({
            'custom-edge': CustomEdge,
            'straight-edge':StraightEdge,
            'hierarchy-edge': HierarchialEdge,
            'stair-edge': StepEdge,
            'attribute-edge': AttributeEdge
        }),
        [],
    );

    const chenNodeTypes = useMemo(
        () => ({
            Entity: Entity,
            Relationship: Relationship,
            Attribute: Attribute,
            Interface: Interface
        }),
        [],
    );

    let nodeTypes = initialNotation ==='chen' ? chenNodeTypes: crowNodeTypes;

    let edgeTypes = initialNotation ==='chen' ? chenEdgeTypes: crowEdgeTypes;

    // backend connection
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/test/nodes')
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
                console.log(response.data)
                setNodes(response.data)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get('/connect/edges')
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
                console.log(response.data)
                setEdges(response.data)
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

    const [positionUpdate,setPositionUpdate]=useState([]);


    const [selectedElements, setSelectedElements] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);


    // proximity constants
    const store = useStoreApi();
   const { getInternalNode } = useReactFlow();

    // const getClosestEdge =
    //     //useCallback(
    //     (node) => {
    //     const { nodeLookup } = store.getState();
    //     const internalNode = getInternalNode(node.id);
    //
    //     const closestNode = Array.from(nodeLookup.values()).reduce(
    //         (res, n) => {
    //             if (n.id !== internalNode.id) {
    //                 const dx =
    //                     n.internals.positionAbsolute.x -
    //                     internalNode.internals.positionAbsolute.x;
    //                 const dy =
    //                     n.internals.positionAbsolute.y -
    //                     internalNode.internals.positionAbsolute.y;
    //                 const d = Math.sqrt(dx * dx + dy * dy);
    //
    //                 if (d < res.distance && d < MIN_DISTANCE) {
    //                     res.distance = d;
    //                     res.node = n;
    //                 }
    //             }
    //
    //             return res;
    //         },
    //         {
    //             distance: Number.MAX_VALUE,
    //             node: null,
    //         },
    //     );
    //
    //     if (!closestNode.node) {
    //         return null;
    //     }
    //
    //     const closeNodeIsSource =
    //         closestNode.node.internals.positionAbsolute.x <
    //         internalNode.internals.positionAbsolute.x;
    //
    //     return {
    //         id: closeNodeIsSource
    //             ? `${closestNode.node.id}-${node.id}`
    //             : `${node.id}-${closestNode.node.id}`,
    //         source: closeNodeIsSource ? closestNode.node.id : node.id,
    //         target: closeNodeIsSource ? node.id : closestNode.node.id,
    //     };
    // }
    // //, []);
    //
    // const onNodeDrag = //useCallback(
    //     (_, node) => {
    //         const closeEdge = getClosestEdge(node);
    //
    //         setEdges((es) => {
    //             const nextEdges = es.filter((e) => e.className !== 'temp');
    //
    //             if (
    //                 closeEdge &&
    //                 !nextEdges.find(
    //                     (ne) =>
    //                         ne.source === closeEdge.source && ne.target === closeEdge.target,
    //                 )
    //             ) {
    //                 closeEdge.className = 'temp';
    //                 nextEdges.push(closeEdge);
    //             }
    //             console.log(nextEdges)
    //             return nextEdges;
    //         });
    //     }
    //     //, [getClosestEdge, setEdges],);
    // const onNodeDragStop = //useCallback(
    //     (_, node) => {
    //         const closeEdge = getClosestEdge(node);
    //
    //         setEdges((es) => {
    //             const nextEdges = es.filter((e) => e.className !== 'temp');
    //
    //             if (
    //                 closeEdge &&
    //                 !nextEdges.find(
    //                     (ne) =>
    //                         ne.source === closeEdge.source && ne.target === closeEdge.target,
    //                 )
    //             ) {
    //                 nextEdges.push(closeEdge);
    //             }
    //             console.log(nextEdges)
    //             return nextEdges;
    //         });
    //     }
    //     //, [getClosestEdge], );


    // the passed handler has to be memoized, otherwise the hook will not work correctly
    const onChange =
        useCallback(
        ({ nodes, edges }) => {
        console.log(nodes)

        if(nodes.length !==0) {

            setSelectedElements(nodes.map((node) => node));
        }
       // console.log(selectedNodes)
        else {
            setSelectedElements(edges.map((edge) => edge));
            console.log("change is happening here")
        }
    }
    , [])
    // console.log(selectedNodes)
    useOnSelectionChange({
        onChange

    });


    const updateNodePosition = async (updatedNodes) => {
        axios.put(`/test/nodes/position/${updatedNodes[0].id}`, updatedNodes)
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    };

    const updateNodeData = async (node) => {
        console.log(node[0].id)

        axios.put(`/test/nodes/data/${node[0].id}`, node)
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    };

    const updateEdgeData = async (edge) => {
        console.log(edge[0]?.id)

        axios.put(`/connect/edges/data/${edge[0]?.id}`, edge)
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    };


    const handleNodesChange =
        //useCallback(
            (changes) => {
        onNodesChange(changes);

        // Extract only the nodes that have actually been updated
        const updatedNodes = nodes.filter((node) => {
            const change = changes.find(change => change.id === node.id && change.position);
            return change && (
                change.position.x !== node.position.x || change.position.y !== node.position.y
            );
        }).map(node => ({
            id: node.id,
            position: node.position, // Capture the updated position
        }));

        // Call the updateNodePosition method only if there are changes
        if (updatedNodes.length > 0) {
            updateNodePosition(updatedNodes);
            // console.log(updatedNodes)
        }
    }
   // , [onNodesChange]);

    function updateNode(victim, data,color) {
        console.log(color)
        // console.log(nodes.find(victim[0].id===))
        if(victim[0].tag ==='edge') {

            const updateEdge = edges.map((edge)=>{
                if (edge.id===victim[0].id){
                    return{
                        ...edge,
                        data:data
                    }
                }
            }).filter((node)=>node?.id===victim[0].id)
            console.log(updateEdge)


            setEdges((eds) =>
                eds.map((edge) => {

                    if (edge.id === victim[0].id) {
                        console.log('I entered')
                        // it's important that you create a new node object
                        // in order to notify react flow about the change
                        if(edge.type==='custom-edge'){
                            return {
                                ...edge,
                                data: {cardinality: data.cardinality},
                            };
                        }

                        if(edge.type==='hierarchy-edge'){
                            return {
                                ...edge,
                                data: {property: data.property},
                            };
                        }

                        if(edge.type==='straight-edge'){
                            return {
                                ...edge,
                                data: {required: data.required},
                            };
                        }

                    }

                    return edge;
                }),
            );
            updateEdgeData(updateEdge);

        }

        else{


            const updateNode = nodes.map((node)=>{
                if (node.id===victim[0].id){
                    return{
                        ...node,
                        data:data
                    }
                }
            }).filter((node)=>node?.id===victim[0].id)
            console.log(updateNode)

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
            updateNodeData(updateNode);


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
            const newID= source + "-to-"+target
            console.log(sourceNode.type)
            let newEdge = {};
            if(sourceNode.type ==='Attribute' && (targetNode.type==='Entity' || targetNode.type==='Interface'||targetNode.type==='Relationship' )){
                 newEdge = { ...connection, id:newID , type: 'straight-edge', tag:'edge' ,data: {required : true}};
                //setEdges((eds) => addEdge(newEdge, eds));
            }
            if(sourceNode.type ==='Attribute' && targetNode.type==='Attribute'){
                newEdge = { ...connection, id:newID , type: 'attribute-edge', tag:'edge' ,data: {cardinality : 'N/A'} };
                //setEdges((eds) => addEdge(newEdge, eds));
            }

            if(sourceNode.type==='Hierarchy'){
                newEdge = { ...connection, id:newID , type: 'hierarchy-edge', tag:'edge' , data: {cardinality : 'one-to-many'} };
                //setEdges((eds) => addEdge(newEdge, eds));
            }
            if(sourceNode.type==='Interface' && (targetNode.type==='Entity' || targetNode.type ==='Interface')){
                newEdge = { ...connection, id:newID , type: 'hierarchy-edge', tag:'edge' , data: {property : 'total-exclusive'},
                    markerStart: {
                        type: MarkerType.ArrowClosed,
                        width: 3,
                        height: 3,
                        color: '#B90E0A',
                    }
                        };
                //setEdges((eds) => addEdge(newEdge, eds));
            }
            if(sourceNode.type==='Interface' && targetNode.type==='Relationship'){
                newEdge = { ...connection, id:newID , type: 'custom-edge', tag:'edge' , data: {cardinality : 'one-to-many'} };
                //setEdges((eds) => addEdge(newEdge, eds));
            }
            else if(sourceNode.type==='Entity' && targetNode.type==='Relationship' ) {
                newEdge = {...connection, id:newID , type: 'custom-edge', tag:'edge' , data: {cardinality: 'one-to-many'}};
                //setEdges((eds) => addEdge(newEdge, eds));
            }
            // posting to the database
            axios.post('/connect/edges',newEdge)
                .then(response => {
                    console.log(response)
                    setData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
            setEdges((eds) => addEdge(newEdge, eds));

        }
       // ,
     //    [setEdges],
    // );
    useEffect(()=> console.log(nodes),[nodes]);
    useEffect(()=> console.log(edges),[edges]);



    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const colorChooser =(type)=>{
        switch (type){
            case 'Entity':
                return '#FFFFC5';
            case 'Relationship':
                return '#90EE90';
            case 'Attribute':
                return '#FFA07A';
            case 'Interface':
                return '#00bfff';

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
                            tag:'node',
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
                            tag:'node',
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
                            tag:'node',
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                primaryKey: false,
                                attributeType: 'single-value',
                                dataType: 'VARCHAR',
                                dataSize: 255,
                                color: colorChooser(type)
                            },
                        };
                    };
                    if(type === 'entityNode') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            tag:'node',
                            data: {
                                label: `${type}`,
                                name: `${type}`,
                                attributes: [{}],

                            },
                        };
                    };
                    if(type === 'Interface') {
                        newNode = {
                            id: getId(),
                            type,
                            position,
                            tag:'node',
                            data: {
                                label: `${type} node`,
                                name: `${type}`,
                                color: colorChooser(type),
                                collapseType: 'downwards'
                            },
                        };
                    };




        // posting to the database
                axios.post('/test/nodes',newNode)
                    .then(response => {
                        console.log(response)
                        setData(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setError(error);
                        setLoading(false);
                    });


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
                    onNodesChange={handleNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}

                    // onNodeDragStop={onNodeDragStop}
                    // onNodeDrag={onNodeDrag}

                >
                    <Background variant={selectedBackground}/>
                    <MiniMap/>

                    <Panel position="top-right" style={{marginTop:'0px',marginRight:'0px'}}>
                        <div className="legend-panel" style={{backgroundColor:"white", width:"170px",height:"90px",border:'2px solid #ccc'}}>
                            <h4 className="legend-panel-title">Legend:</h4>
                            <ul className="legend-panel-list">
                                <li>The connection direction is always from
                                    <span className="handle-legend" style={{
                                        display: 'inline-block',
                                        width: '8px',   // Width of the circle
                                        height: '8px',  // Height of the circle
                                        backgroundColor: 'black',
                                        borderRadius: '50%', // Make it circular
                                        marginLeft: '4px',
                                        marginRight: '4px'
                                    }}>
                    </span>to<span className="handle-legend" style={{
                                        display: 'inline-block',
                                        width: '8px',   // Width of the circle
                                        height: '8px',  // Height of the circle
                                        backgroundColor: 'darkred',
                                        borderRadius: '50%', // Make it circular
                                        marginLeft: '4px',
                                        marginRight: '4px'
                                    }}>
                    </span> in nodes</li>
                                <li>Always remember to convert to relational before SQL</li>
                            </ul>
                        </div>
                    </Panel>
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

export default DnDFlow