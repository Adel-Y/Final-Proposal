
import './App.css';
import React from "react";
import Navbar from "./Navbar";
import Flow from "./Pages/Flow";
import Pallet from "./Pallet";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Relational from "./Pages/Relational";
import {ReactFlowProvider} from "@xyflow/react";
 function App(){


  return(

  <>

    <Navbar/>

    </>

);

 }

export default App


// // FlowComponent.js
// import React, { useState, useCallback } from 'react';
// import { ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Background, ReactFlowProvider } from '@xyflow/react';
// import 'reactflow/dist/style.css';
// import EntityCrow from './Data Structures/EntityCrow';
// import './EntityNode.css';
//
// const nodeTypes = {
//     entityNode: EntityCrow,
// };
//
// const initialNodes = [
//     {
//         id: '1',
//         type: 'entityNode',
//         position: { x: 100, y: 100 },
//         data: { label: 'Student', attributes: ['StudentID', 'Name', 'Email'] },
//     },
//     {
//         id: '2',
//         type: 'entityNode',
//         position: { x: 400, y: 100 },
//         data: { label: 'Course', attributes: ['CourseID', 'CourseName', 'Credits'] },
//     },
// ];
//
// const initialEdges = [
//     {
//         id: 'e1-2',
//         source: '1',
//         target: '2',
//         animated: true,
//         label: 'Enrolled In',
//     },
// ];
//
// const FlowComponent = () => {
//     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//
//     // Handle adding new nodes
//     const handleAddNode = useCallback((event) => {
//         const newNode = {
//             id: `${nodes.length + 1}`,
//             type: 'entityNode',
//             data: { label: `Node ${nodes.length + 1}`, attributes: [] },
//             position: { x: 200, y: 200 }, // Add at a default position
//         };
//
//         setNodes((nds) => nds.concat(newNode));
//     }, [nodes, setNodes]);
//
//     // Handle connecting nodes with edges
//     const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);
//
//
//     return (
//         <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//             {/* Add Node Button */}
//             <div style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
//                 <button onClick={handleAddNode}>Add Node</button>
//             </div>
//
//             {/* ReactFlow Component for Node Drag-and-Drop */}
//             <div style={{ flexGrow: 1 }}>
//                 <ReactFlowProvider>
//                     <ReactFlow
//                         nodes={nodes}
//                         edges={edges}
//                         onNodesChange={onNodesChange} // Handle drag and drop for nodes
//                         onEdgesChange={onEdgesChange} // Handle edge changes
//                         onConnect={onConnect}         // Handle connecting nodes
//                         nodeTypes={nodeTypes}
//                         fitView
//                     >
//                         <Controls />
//                         <Background />
//
//                     </ReactFlow>
//                 </ReactFlowProvider>
//             </div>
//         </div>
//     );
// };
//
// export default () => (
//     <ReactFlowProvider>
//         <FlowComponent />
//     </ReactFlowProvider>
// );
