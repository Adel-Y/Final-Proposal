
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import { ItemTypes } from './Itemtypes.js'
import DisplayItem from "./DisplayItem";
import React from "react";
import Navbar from "./Navbar";
import Resize from "./Resize";
import Linking from "./Data Structures/Linking";

 function App(){
    const types = ItemTypes
  return(



  <>

{/*<Navbar/>*/}


   <DndProvider backend={HTML5Backend}>
    <div className='page'>

          <div className='pallet'>    
                            <h2>Drag Items</h2>


                            <DragItem   ItemType={ItemTypes.ENTITY} />
                            <DragItem   ItemType={ItemTypes.WEAK_ENTITY} />
                            <DragItem   ItemType={ItemTypes.RELATIONSHIP} />
                            <DragItem   ItemType={ItemTypes.WEAK_RELATIONSHIP} />
                            <DragItem   ItemType={ItemTypes.ATTRIBUTE} />
                            <DragItem    ItemType={ItemTypes.LINK}/>
          </div>


          <div className='zone'>

             <h2>Drop Zone</h2>
              <DropZone/>
              {/*<Resize/>*/}

          </div>

    </div>
    </DndProvider>



    </>

);

 }

export default App;


