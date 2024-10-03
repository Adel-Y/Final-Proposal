
import './navbar.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Flow from "./Pages/Flow";
import Relational from "./Pages/Relational";
import App from "./App";
import Home from "./Pages/Home";
import Code from "./Pages/Code";

function Navbar(){
    return(
        <>
        <BrowserRouter>

            <ul className='list'>
                <li className='listItem nameTag'> <a href="/"><span style={{color:"red",fontSize:"16px"}}>DB</span><span>Playground</span></a></li>
                <li className='listItem'><a href="/relational">Relational</a></li>
                <li className='listItem'><a href="/code">SQL</a></li>
                <li className="dropdown listItem">
                    <a href="javascript:void(0)" className="dropbtn">Dropdown</a>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </li>
            </ul>
            <Routes>
                <Route  path="/" element={<Home/>}/>
                    {/*<Route index element={<Flow/>} />*/}
                <Route path="relational" element={<Relational/>} />
                <Route path="code" element={<Code/>} />


            </Routes>
        </BrowserRouter>





        </>

    );

}

export default Navbar;


