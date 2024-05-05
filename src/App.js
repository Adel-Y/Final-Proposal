import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



function DraggableItem(){

  const [dragging, setDragging] = useState(false);

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setDragging(true);
  };

  function handleDragOver(e) {
    e.preventDefault();
  };

  function handleDrop(e){
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(data);
    const dropZone = e.target;
    dropZone.appendChild(draggedItem);
    setDragging(true);
  };

  return (
    <>
             <div
              id="drag-item"
              draggable
              onDragStart={handleDragStart}

            >
              Drag Me
            </div>
            
    </>
  );

}

function DropZone(){

  const [dragging, setDragging] = useState(false);
  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setDragging(true);
  };

  function handleDragOver(e) {
    e.preventDefault();
  };

  function handleDrop(e){
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(data);
    const dropZone = e.target;
    dropZone.appendChild(draggedItem);
    setDragging(true);
  };

  return (
    <>


          <div className='zone'>
            <div
              className={'drop-zone'}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              Drop Here
            </div>

          </div>


    </>
  );

}



 function App(){
  return(
  <>
    <div className='page'>

          <div className='pallet'>

          <DraggableItem/>
          <DraggableItem/>

          </div>

          <br></br>


          <div className='zone'>

              <DropZone/>

          </div>

    </div>
    </>

);

 }

export default App;


