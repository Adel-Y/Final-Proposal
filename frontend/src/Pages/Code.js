import '../App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to flatten nested columns
const flattenColumns = (columns) => {
    return columns.flat(); // Flatten the array to remove nested arrays
};

function jsonToSQL(jsonData) {
    // Define the data types that do not require a dataSize
    const noDataSizeTypes = new Set(["DATE", "TINYINT", "BOOLEAN", "ENUM", "TIMESTAMP", "TIME", "YEAR"]);

    const sqlQueries = jsonData.tables.map(table => {
        let tableSQL = `CREATE TABLE ${table.name} (\n`;

        // Flatten the columns and construct SQL for each column
        const flattenedColumns = flattenColumns(table.columns);
        const columnsSQL = flattenedColumns.map(col => {
            let columnSQL = `${col.name} `;

            // Append data type
            if (col.dataType) {
                columnSQL += `${col.dataType}`;
            }

            // Conditionally append dataSize if the data type allows it
            if (col.dataSize && !noDataSizeTypes.has(col.dataType)) {
                columnSQL += `(${col.dataSize})`;
            }

            // Add PRIMARY KEY if specified
            if (col.primaryKey) {
                columnSQL += ` PRIMARY KEY`;
            }

            // Add FOREIGN KEY constraint if specified
            if (col.foreignKey) {
                columnSQL += ` REFERENCES ${col.foreignTable}(${col.name.split('_')[0]})`; // Example reference to a foreign table
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
