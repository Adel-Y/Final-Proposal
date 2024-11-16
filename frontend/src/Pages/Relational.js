
import '../App.css';
import React, {useCallback, useEffect, useState} from "react";

import axios from "axios";


const flattenAttributes = (attributes) => {
    return attributes.flat(); // Flatten the array to remove nested arrays
};



// Table component
const Table = ({ name, columns }) => {
    // Define the data types that do not require a dataSize
    const noDataSizeTypes = new Set(["DATE", "TINYINT", "BOOLEAN", "ENUM", "TIMESTAMP", "TIME", "YEAR"]);

    return (
        <table style={tableStyle}>
            <caption>{name}</caption>
            <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={index} style={col.primaryKey ? keyCellStyle : col.foreignKey ? foreignKeyCellStyle : cellStyle}>
                        {col.name}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                {columns.map((col, index) => (
                    <td key={index} style={cellStyle}>
                        {noDataSizeTypes.has(col.dataType)
                            ? col.dataType
                            : `${col.dataType} (${col.dataSize})`}
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
                setDatabase(response.data)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);


    if (!database || !database.tables || database.tables.length === 0) {
        return <div>Loading...</div>; // Display message if no data
    }

    return (


        <div>
            {database.tables.map((table,index) => (
                <Table key={index} name={table.name} columns={flattenAttributes(table.columns)} />
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

const foreignKeyCellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    color:'red'
};

export default Relational;



