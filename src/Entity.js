import './App.css';
import { useState } from 'react';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Itemtypes.js'





const DraggableItem=()=>{
    // const name ="Entity"
    // const [dragging, setDragging] = useState(false);
    //
    // function handleDragStart(e) {
    //   e.dataTransfer.setData('text/plain', e.target.id);
    //   setDragging(true);
    // };
    //
    // function handleDragOver(e) {
    //   e.preventDefault();
    // };

    const [, drag] = useDrag(() => ({ type: ItemTypes.ENTITY }))

    return (
      <>
          <div ref={drag} className={'drag-item'}>
              Drag me
          </div>

      </>
    );
  
  }
  export default DraggableItem;