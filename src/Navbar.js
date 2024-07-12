
import './navbar.css';
import React from "react";

function Navbar(){
    return(



        <>
            <ul>
                <li className='nameTag'>Project Name</li>
                <li><a href="#home">Link 1</a></li>
                <li><a href="#news">Link 2</a></li>
                <li className="dropdown">
                    <a href="javascript:void(0)" className="dropbtn">Dropdown</a>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </li>
            </ul>


        </>

    );

}

export default Navbar;


