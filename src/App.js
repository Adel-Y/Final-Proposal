
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import { ItemTypes } from './Itemtypes.js'
import DisplayItem from "./DisplayItem";
import React from "react";
import Navbar from "./Navbar";
import Flow from "./Flow";
import {TextUpdaterNode} from "./TextUpdaterNode";

 function App(){





  return(



  <>

{/*<Navbar/>*/}


   {/*<DndProvider backend={HTML5Backend}>*/}
    <div className='page'>

          <div className='pallet'>
                            <h2>Drag Items</h2>


                            {/*<DragItem   ItemType={ItemTypes.ENTITY} />*/}
                            {/*<DragItem   ItemType={ItemTypes.WEAK_ENTITY} />*/}
                            {/*<DragItem   ItemType={ItemTypes.RELATIONSHIP} />*/}
                            {/*<DragItem   ItemType={ItemTypes.WEAK_RELATIONSHIP} />*/}
                            {/*<DragItem   ItemType={ItemTypes.ATTRIBUTE} />*/}
                            {/*<DragItem    ItemType={ItemTypes.LINK}/>*/}
          </div>
        <div>
        <h2>Drop Zone</h2>
          <div className='zone'>


              <Flow/>



          </div>
        </div>
    </div>
    {/*</DndProvider>*/}



      {/*<TextUpdaterNode/>*/}

    </>

);

 }

export default App;


