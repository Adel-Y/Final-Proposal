import React, {useCallback,useState,useEffect} from 'react';
import {Handle, Position, NodeToolbar, useNodesState, Panel, useReactFlow, useNodeId, addEdge} from "reactflow";




const Entity = ({ data, isConnectable,onDragStart}) => {

    let label = 'Entity'
    const id =useNodeId()

    const [isEditing, setIsEditing] = useState(false);

    const [name,setName]= useState(null);
    // setName(data.name)

    const { setNodes } = useReactFlow();

    const  [newData,setNewData]=useState([]);



    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);



// data setting function
  const x=  useCallback( (e)=> {

       setName(data.name)

   },[data])




    const onCreate = useCallback(
        (event) => {
            console.log(event.dataTransfer.get('test'))
            return  event.dataTransfer.get('test')
        },
        [],
    );






    const handleSave = () => {
        setIsEditing(false);
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, label } } : node
            )
        );
    };



    return (
        <>
            <NodeToolbar >


                <button onClick={() => {
                    setNodes((es) => es.filter((e) => e.id !==id ));}}>
                    delete</button>


                <button >style</button>
            </NodeToolbar>

            <div onDragStart={onDragStart}
                draggable
                className= 'entity'

            >

                <Handle type="target" position={Position.Top} id="c" isConnectable={isConnectable} />

                <Handle
                    type="source"
                    position={Position.Left}
                    id="a"
                    isConnectable={isConnectable}
                />

                <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />

                <Handle type="source" position={Position.Right} id="d" isConnectable={isConnectable} />

                <p className={'entity-text'}>{data?  data?.name: "Entity"}</p>

            </div>



        </>
    );
};

export default Entity;