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

    const [isPrimaryKey,setPrimaryKey]=useState(false)

    const [attributeType,setAttributeType]=useState('')

    const [dataType,setDataType]=useState('')

    const [dataSize,setDataSize]=useState(99)


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
    const primaryKey =()=>{
        setPrimaryKey(!isPrimaryKey)

    }
    const changeColor =(value) =>{
        setColor(value)
    }

    const updateCardinality =(value)=>{
        setEdgeCardinality(value)
    }

    const updateAttributeType =(value)=>{
        setAttributeType(value)
    }


    const updateDataType =(value)=>{
        setDataType(value)
    }

    const updateDataSize =(value)=>{
        setDataSize(value)
    }

    const renderSwitch=()=> {
        switch(node[0]?.type) {
            case 'Entity':
                return <div className='sidebar-elements'>
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
                        <input type="color" defaultValue={node[0]?.color}   onChange={(e)=> changeColor(e.target.value)}/>
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
                return <div className='sidebar-elements'>
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
                        <input type="color" defaultValue={node[0]?.color}   onChange={(e)=> changeColor(e.target.value)}/>
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
                return <div className='sidebar-elements'>
                    <label>Cardinality:
                        <select defaultValue={node[0]?.data.cardinality} onChange={(e)=>updateCardinality(e.target.value)}>
                            <option value='zero-to-one'>(0,1)</option>
                            <option value='one-to-one'>(1,1)</option>
                            <option value='zero-to-many'>(0,N)</option>
                            <option value='one-to-many'>(1,N)</option>
                        </select>
                    </label>
                </div>
                ;

            case 'Attribute':
                return <div className='sidebar-elements'>
                    <label>
                        Name:
                        <input name="attribute-name" type="text" placeholder={'Enter Name Here'} defaultValue={node[0]?.data.name}  onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br></br>
                    <label>
                        Primary Key:
                        <input type="checkbox" value='hello' defaultChecked={node[0]?.data.primaryKey ? true : false} onClick={(e)=>  primaryKey() }/>
                    </label>
                    <br></br>

                    <label>Attribute Type:
                        <select defaultValue={node[0]?.data.attributeType} onChange={(e)=>updateAttributeType(e.target.value)}  >
                            <option value='single-value'>Single Value</option>
                            <option value='multi-value'>Multi-Value</option>
                            <option value='derived-attribute'>Derived Attribute</option>
                            <option value='composite'>Composite</option>
                        </select>
                    </label>
                    <br></br>
                    <label>Data Type:
                        <select defaultValue={node[0]?.data.dataType} onChange={(e)=>updateDataType(e.target.value)}  >
                            <optgroup label="Numeric Data Types">
                                <option value="BIGINT">BIGINT</option>
                                <option value="BIT">BIT</option>
                                <option value="DECIMAL">DECIMAL</option>
                                <option value="DOUBLE">DOUBLE</option>
                                <option value="FLOAT">FLOAT</option>
                                <option value="INT">INT</option>
                                <option value="INTEGER">INTEGER</option>
                                <option value="MEDIUMINT">MEDIUMINT</option>
                                <option value="NUMERIC">NUMERIC</option>
                                <option value="REAL">REAL</option>
                                <option value="SMALLINT">SMALLINT</option>
                                <option value="TINYINT">TINYINT</option>
                            </optgroup>
                            <optgroup label="String Data Types">
                                <option value="BINARY">BINARY</option>
                                <option value="BLOB">BLOB</option>
                                <option value="CHAR">CHAR</option>
                                <option value="CLOB">CLOB</option>
                                <option value="ENUM">ENUM</option>
                                <option value="LONGTEXT">LONGTEXT</option>
                                <option value="MEDIUMBLOB">MEDIUMBLOB</option>
                                <option value="MEDIUMTEXT">MEDIUMTEXT</option>
                                <option value="NCHAR">NCHAR</option>
                                <option value="NVARCHAR">NVARCHAR</option>
                                <option value="SET">SET</option>
                                <option value="TEXT">TEXT</option>
                                <option value="TINYBLOB">TINYBLOB</option>
                                <option value="TINYTEXT">TINYTEXT</option>
                                <option value="VARBINARY">VARBINARY</option>
                                <option value="VARCHAR">VARCHAR</option>
                                <option value="XML">XML</option>
                            </optgroup>
                            <optgroup label="Date Data Types">
                                <option value="DATE">DATE</option>
                                <option value="DATETIME">DATETIME</option>
                                <option value="INTERVAL">INTERVAL</option>
                                <option value="TIME">TIME</option>
                                <option value="TIMESTAMP">TIMESTAMP</option>
                            </optgroup>
                        </select>

                    </label>
                    <br></br>
                    <label>
                        Data Size:
                        <input style={{width:'45px'}} type="number" placeholder={'eg. 99'} defaultValue={node[0]?.data.dataSize}  onChange={(e) => updateDataSize(e.target.value)}/>
                    </label>
                    <br></br>
                    <label>
                        Color:
                        <input type="color" defaultValue={node[0]?.color}   onChange={(e)=> changeColor(e.target.value)}/>
                    </label>
                    <br></br>
                    <label>Related to:
                            <p>Entity 1</p>
                    </label>


                </div>
                    ;
            case 'Hierarchy':

            return <div className='sidebar-elements'>
                <label>Is Connected to Entities:
                    <p>Entity 1</p>
                    <p>Entity 2</p>
                </label>

                <label>Descend From:
                    <p>Interface</p>
                </label>
            </div>
                ;
            case 'Interface':
                return <div className='sidebar-elements'>
                    <label>
                        Name:
                        <input name="entity-name" type="text" placeholder={'Enter Name Here'} defaultValue={node[0]?.data.name}  onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br></br>

                    <br></br>
                    <label>
                        Color:
                        <input type="color" defaultValue={node[0]?.color}   onChange={(e)=> changeColor(e.target.value)}/>
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
            default:
                return 'foo';
        }
    }
    const updateData = () => {
        if(node[0]?.type==='custom-edge') {

            const data =
                {
                    cardinality: edgeCardinality,
                }
            return data;
        }
        else{

            let data =
                { }
            if(node[0]?.type=== 'Entity') {
                data = {
                            label: node[0]?.data.label,
                            name: name,
                            weak: isWeak,
                            color: color
                };
            };
            if(node[0]?.type === 'Relationship') {
                data = {
                    label: node[0]?.data.label,
                    name: name,
                    weak: isWeak,
                    color: color
                };
            };
            if(node[0]?.type === 'Attribute') {
                data = {
                    label: node[0]?.data.label,
                    name: name,
                    primaryKey: isPrimaryKey,
                    attributeType: attributeType,
                    dataType: dataType,
                    dataSize:dataSize,
                    color: color
                };
            };
            if(node[0]?.type === 'Hierarchy') {
                data = {
                    label: node[0]?.data.label,
                    name: name,
                };
            };
            if(node[0]?.type === 'Interface') {
                data = {
                    label: node[0]?.data.label,
                    name: name,
                    color: color
                };
            };


            return data;
        }

    }



    const handleUpdate = () => {

        if (node) {
            updateNode(node, updateData());
        }
    };

    return (
        <div className={`sidebar ${selectedNode ? 'open' : ''} fontTheme`}>
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
