// src/Sidebar.js
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {useReactFlow} from "reactflow";


const Sidebar = ({ node, updateNode }) => {
    const [name, setName] = useState('');

    const [color, setColor] = useState('');


    const [selectedNode, setSelectedNode] = useState(false);


    const {setNodes} = useReactFlow()

    const [isWeak,setIsWeak]=useState(false)


    const [nodeData, setNodeData] = useState([]);

    const [edgeCardinality, setEdgeCardinality]=useState('');


    useCallback(()=>{
        setNodeData(node[0]?.data)
        console.log('set')
    },[node])
    // setNodeData(node[0]?.data)
    console.log(node[0])
    console.log(nodeData)


    useEffect(() => {
        if (node.length === 0 ) {
            setSelectedNode(false)
        } else {
            setSelectedNode(true)

        }
    });


    const setNodeWeak =()=>{
        setIsWeak(!isWeak)

    }

    const changeColor =(value) =>{
        setColor(value)
    }

    const updateCardinality =(value)=>{
        setEdgeCardinality(value)
    }

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
                        <input type="checkbox" value='hello' defaultChecked={node[0]?.data.weak ? true : false} onClick={(e)=>  setNodeWeak()} />
                    </label>
                    <br></br>
                    <label>
                        Color:
                        <input type="color" defaultValue={node[0]?.data.color}   onChange={(e)=> changeColor(e.target.value)}/>
                    </label>
                    <br></br>

                    <label>Attribute List:
                        <ul>
                            <li>Attribute one: <p>name and type</p></li>
                            <li>Attribute two: <p>name and type</p></li>
                        </ul>
                    </label>

                </div>
                ;
            case 'Relationship':
                return <div>
                    <label>
                        Name:
                        <input name="entity-name" type="text" placeholder={'Enter Name Here'} defaultValue={node[0]?.data.name}  onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br></br>
                    <label>
                        Weak Relationship:
                        <input type="checkbox" value='hello' defaultChecked={node[0]?.data.weak ? true : false} onClick={(e)=>  setNodeWeak()} />
                    </label>
                    <br></br>
                    <label>
                        Color:
                        <input type="color" defaultValue={node[0]?.data.color}   onChange={(e)=> changeColor(e.target.value)}/>
                    </label>
                    <br></br>

                    <label>
                        Connected To:
                        <ul>
                            <li>Entity one: <p>name</p></li>
                            <li>Entity two: <p>name</p></li>
                        </ul>
                    </label>
                    <br></br>

                    <label>Cardinality: </label>

                </div>
                    ;

            case 'custom-edge':
                return <div>
                    <label>Cardinality:
                        <select defaultValue={node[0]?.data.cardinality} onChange={(e)=>updateCardinality(e.target.value)}>
                            <option value='one-to-one'>(1,1)</option>
                            <option value='one-to-many'>(1,N)</option>
                            <option value='many-to-one'>(N,1)</option>
                            <option value='many-to-many'>(M,N)</option>
                        </select>
                    </label>
                </div>
                ;
            default:
                return 'foo';
        }
    }
    const updateData = () => {
        if(node[0]?.type==='custom-edge') {
                console.log('Entrata')
            const newDat =
                {
                    cardinality: edgeCardinality,
                }
            return newDat;
        }
        else{
            console.log('Ya Zahraa')
            const newDat =
                {
                    label: node[0]?.data.label,
                    name: name,
                    weak: isWeak,
                    color: color
                }


            return newDat;
        }

    }



    const handleUpdate = () => {

        if (node) {
            updateNode(node, updateData() );
        }
    };

    return (
        <div className={`sidebar ${selectedNode ? 'open' : ''}`}>
            <h2>Update Node: {node[0]?.id}</h2>
            {/*<form action={handleUpdate()}>*/}
            <div>

                {renderSwitch()}

            </div>
            <button className="sd-button" onClick={handleUpdate}>Update</button>
            {/*</form>*/}
        </div>

    );
};

export default Sidebar;
