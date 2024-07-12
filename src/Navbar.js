
import './navbar.css';
import React from "react";

function Navbar(){
    return(



        <>
            <ul className='list'>
                <li className='listItem nameTag'>Project Name</li>
                <li className='listItem'><a href="#home">Link 1</a></li>
                <li className='listItem'><a href="#news">Link 2</a></li>
                <li className="dropdown listItem">
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


