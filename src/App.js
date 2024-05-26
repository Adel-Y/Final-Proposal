
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import DropZone from './DropZone';
import { ItemTypes } from './Itemtypes.js'

 function App(){
     function idGenerator(){
         return (new Date().getTime() * Math.random())
     }
  return(
  <>
 

   <DndProvider backend={HTML5Backend}>
    <div className='page'>

          <div className='pallet'>    
                            <h2>Drag Items</h2>
                            <DragItem  name={ItemTypes.ENTITY} />
                            <DragItem  name={ItemTypes.RELATIONSHIP} />
                            <DragItem  name={ItemTypes.WEAK_RELATIONSHIP} />
          </div>

          <br></br>
          <div className='zone'>

             <h2>Drop Zone</h2>
              <DropZone/>

          </div>

    </div>
    </DndProvider>



    </>

);

 }

export default App;


