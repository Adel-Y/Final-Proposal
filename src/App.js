
import './App.css';
import React from "react";
import Navbar from "./Navbar";
import Flow from "./Flow";
import Pallet from "./Pallet";

 function App(){


  return(

  <>

    <Navbar/>

    <div className='page'>
        <Pallet/>
        <div>
        <h4>Drop Zone</h4>
          <div className='zone'>
              <Flow/>
          </div>
        </div>
    </div>


    </>

);

 }

export default App;


