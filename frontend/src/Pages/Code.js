import '../App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to flatten nested columns
const flattenColumns = (columns) => {
    return columns.flat(); // Flatten the array to remove nested arrays
};

function jsonToSQL(jsonData) {
    const sqlQueries = jsonData.tables.map(table => {
        let tableSQL = `CREATE TABLE ${table.name} (\n`;

        // Flatten the columns and construct SQL for each column
        const flattenedColumns = flattenColumns(table.columns);
        const columnsSQL = flattenedColumns.map(col => {
            let columnSQL = `${col.name} `;

            // Handling type if it's provided
            if (col.dataType) {
                columnSQL += `${col.dataType}`;
            }
            if (col.dataSize) {
                columnSQL += `(${col.dataSize})`;
            }

            // Primary key
            if (col.primaryKey) {
                columnSQL += ` PRIMARY KEY`;
            }

            // Foreign key
            if (col.foreignKey) {
                columnSQL += ` FOREIGN KEY REFERENCES ${col.foreignTable}(${col.name})`; // Example reference to a foreign table
            }

            return columnSQL;
        }).join(',\n');

        // Closing the table definition
        tableSQL += columnsSQL + '\n);';

        return tableSQL;
    });

    return sqlQueries;
}

// Main component that renders all tables from the JSON data
const Code = () => {
    const [database, setDatabase] = useState({ tables: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/retrieve/testerQuery')
            .then(response => {
                console.log("Fetched Data:", response.data);
                setDatabase(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display message while loading
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>; // Display error message
    }

    if (!Array.isArray(database.tables) || database.tables.length === 0) {
        return <div>No tables found.</div>; // Display message if no tables are found
    }

    const sqlArray = jsonToSQL(database);

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
