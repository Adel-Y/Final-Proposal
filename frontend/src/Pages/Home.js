
import '../App.css';
import React, {useCallback, useEffect, useState} from "react";
import Flow from "./Flow";
import Pallet from "../Pallet";
import {ReactFlowProvider} from "@xyflow/react";
import {DnDProvider} from "../DnDContext";

function Home(){

    const [notation,setNotation]=useState('crow')

useEffect(()=>{
    console.log(notation)
},[notation])

    return(
        // <ReactFlowProvider>
        <>


            <div className='page'>
                <Pallet setNotationStyle={setNotation} initialNotation={notation}/>
                <div>
                    <h4 className='fontTheme'>Drop Zone</h4>
                    <div className='zone'>
                        <Flow initialNotation={notation}/>
                    </div>
                </div>
            </div>


        </>
        // </ReactFlowProvider>
    );

}

// export default Home

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <Home />
        </DnDProvider>
    </ReactFlowProvider>
);


