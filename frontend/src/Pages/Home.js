
import '../App.css';
import React from "react";
import Navbar from "../Navbar";
import Flow from "./Flow";
import Pallet from "../Pallet";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Relational from "./Relational";
function Home(){


    return(

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

    );

}

export default Home;


