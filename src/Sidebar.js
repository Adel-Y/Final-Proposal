// src/Sidebar.js
import React, {useEffect, useState} from 'react';
import './App.css';
import {useReactFlow} from "reactflow";


const Sidebar = ({ node, updateNode }) => {
    const [name, setName] = useState('');


    const [selectedNode, setSelectedNode] = useState(false);


    const {setNodes} = useReactFlow()


    const [nodeData, setNodeData] = useState([]);
    console.log(node[0])


    useEffect(() => {
        if (node.length === 0) {
            setSelectedNode(false)
        } else {
            setSelectedNode(true)

        }
    });

    const renderSwitch=()=> {
        switch(node[0]?.type) {
            case 'Entity':
                return <div>
                <label>
                    Name:
                    <input name="entity-name" type="text" placeholder={'Enter Name Here'} defaultValue={node[0]?.data.name}  onChange={(e) => setName(e.target.value)} />
                </label>
                    <br></br>
                    <label>
                        Weak Entity:
                        <input type="checkbox" onChange={(e)=>console.log("the box ticked")}/>
                    </label>

                </div>
                ;
            default:
                return 'foo';
        }
    }
    const updateName = (name) => {

        const newDat =
            {
                label: node[0]?.data.label,
                name: name
            }

            return newDat;

    }



    const handleUpdate = () => {
        if (node) {
            updateNode(node, updateName(name) );
        }
    };

    return (
        <div className={`sidebar ${selectedNode ? 'open' : ''}`}>
            <h2>Update Node: {node[0]?.id}</h2>
            <div>

                {renderSwitch()}

            </div>
            <button className="sd-button" onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default Sidebar;
