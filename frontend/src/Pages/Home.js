
import '../App.css';
import React from "react";
import Flow from "./Flow";
import Pallet from "../Pallet";
import {ReactFlowProvider} from "@xyflow/react";
import {DnDProvider} from "../DnDContext";

function Home(){


    return(
        // <ReactFlowProvider>
        <>


            <div className='page'>
                <Pallet/>
                <div>
                    <h4 className='fontTheme'>Drop Zone</h4>
                    <div className='zone'>
                        <Flow/>
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


