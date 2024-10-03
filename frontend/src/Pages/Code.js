
import '../App.css';
import React, {useCallback, useEffect, useState} from "react";

import axios from "axios";



function jsonToSQL(jsonData) {
    const sqlQueries= jsonData.tables.map(table => {
        let tableSQL = `CREATE TABLE ${table.name} (\n`;

        // Iterate over each column to construct the SQL for it
        let columnsSQL = table.columns.map(col => {
            let columnSQL = `${col.name} `;

            // Handling type if it's provided
            if (col.type) {
                if (col.dataType) {
                    columnSQL += `${col.dataType}`;
                }
                if (col.dataSize) {
                    columnSQL += `(${col.dataSize})`;
                }
            }

            // Primary key
            if (col.primaryKey) {
                columnSQL += ` PRIMARY KEY`;
            }

            // Foreign key (We'll assume the foreign key points to a `User_id` column in a related table)
            if (col.foreignKey) {
                columnSQL += ` FOREIGN KEY REFERENCES ${col.foreignTable}(${col.name})`; // Example reference to a Users table
            }

            return columnSQL;
        }).join(',\n');

        // Closing the table definition
        tableSQL += columnsSQL + '\n);';

        return tableSQL;
    });

    return sqlQueries
};


// Main component that renders all tables from the JSON data
const Code = () => {
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
    const sqlArray = jsonToSQL(database);

    // console.log(sql)

    return (

        <div>
            <h1>Generated SQL Tables</h1>
            {sqlArray.map((sql, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Table {index + 1}</h3>
                    <pre>{sql}</pre>
                </div>
            ))}
        </div>
    );
};



export default Code;



