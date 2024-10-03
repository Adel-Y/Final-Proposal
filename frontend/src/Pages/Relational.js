
import '../App.css';
import React, {useCallback, useEffect, useState} from "react";

import Navbar from "../Navbar";
import Flow from "./Flow";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";


// Sample JSON data
const jsonData = {
    tables: [
        {
            name: "Buys",
            columns: [
                {
                    name: "User_id",
                    foreignKey: true
                },
                {
                    name: "Item_id",
                    foreignKey: true
                }
            ]
        },
        {
            name: "Address",
            columns: [
                {
                    name: "Building",
                    primaryKey: false,
                    type: "single-value",
                    dataType: "DOUBLE",
                    dataSize: 99
                },
                {
                    name: "Street",
                    primaryKey: false,
                    type: "single-value",
                    dataType: "VARCHAR",
                    dataSize: 99
                },
                {
                    name: "City",
                    primaryKey: false,
                    type: "single-value",
                    dataType: "VARCHAR",
                    dataSize: 99
                },
                {
                    name: "ID",
                    primaryKey: true,
                    type: "single-value",
                    dataType: "VARCHAR",
                    dataSize: 99
                },
                {
                    name: "User_id",
                    foreignKey: true
                }
            ]
        }
    ]
};

// Table component that handles table rendering
const Table = ({ name, columns }) => {
    return (
        <table style={tableStyle}>
            <caption>{name}</caption>
            <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={index} style={(col.primaryKey||col.foreignKey) ? keyCellStyle : cellStyle}>{col.name}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                {columns.map((col, index) => (
                    <td key={index} style={cellStyle}>
                        {`${col.dataType+'('+col.dataSize+')'}`}
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
};

// Main component that renders all tables from the JSON data
const Relational = () => {
    const [database,setDatabase]= useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/retrieve/testerQuery')
            .then(response => {
                console.log(response)
                setData(response.data);
                setLoading(false);
                console.log(response.data)
                console.log(jsonData)
                setDatabase(response.data)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);


    if (!database || !database.tables || database.tables.length === 0) {
        return <div>No data available</div>; // Display message if no data
    }

    return (


        <div>
            {database.tables.map((table, index) => (
                <Table key={index} name={table.name} columns={table.columns} />
            ))}
        </div>
    );
};

// Styling
const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    margin: '20px',
    minWidth: '300px',
};

const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
};

const keyCellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    textDecoration:'underline'
};

export default Relational;



