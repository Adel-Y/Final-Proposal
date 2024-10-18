import '../App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from "axios";

// Main component that renders all tables from the JSON data
const Decider = () => {
    const [database, setDatabase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decisions, setDecisions] = useState({}); // State to track the user's decisions
    const [primaryKeySelections, setPrimaryKeySelections] = useState({}); // State to track primary key selections for bridge tables
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/retrieve/relCode')
            .then(response => {
                console.log(response.data);
                setDatabase(response.data);
                setLoading(false);

                if(response.data.length === 0) {
                    navigate('/relational');
                }

                // Initialize decisions with default values
                const initialDecisions = {};
                response.data.forEach((data) => {
                    initialDecisions[data.relationship || data.name] = data.default; // Use 'relationship' if available, fallback to 'name'
                });
                setDecisions(initialDecisions);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    // Function to handle selection change for the owner
    const handleDecisionChange = (relationshipKey, selectedValue) => {
        setDecisions(prevDecisions => ({
            ...prevDecisions,
            [relationshipKey]: selectedValue // Use relationship as the key
        }));

        // Clear the primary key selection if the owner changes and it's no longer a bridge table
        if (primaryKeySelections[relationshipKey] && selectedValue !== 'bridge') {
            setPrimaryKeySelections(prevSelections => {
                const newSelections = { ...prevSelections };
                delete newSelections[relationshipKey];
                return newSelections;
            });
        }
    };

    // Function to handle primary key selection for bridge tables
    const handlePrimaryKeySelection = (relationshipKey, selectedPrimaryKey) => {
        setPrimaryKeySelections(prevSelections => ({
            ...prevSelections,
            [relationshipKey]: selectedPrimaryKey
        }));
    };

    // Function to submit the decisions
    const handleSubmit = () => {
        // Convert the decisions object to an array, including primary keys for bridge tables if selected
        const decisionsArray = Object.keys(decisions).map(key => {
            const decision = {
                relationship: key,
                owner: `${decisions[key]==='bridge' ? key: decisions[key]}`
            };

            // Include primary key if the bridge table is selected
            if (decisions[key] === 'bridge' && primaryKeySelections[key]) {
                decision.primaryKey = primaryKeySelections[key];
            }

            return decision;
        });

        console.log("Decisions to send:", decisionsArray);

        // Send the decisions to the backend API
        axios.post('/retrieve/decisions', decisionsArray)
            .then(response => {
                console.log("Decisions submitted successfully", response.data);
                navigate('/relational');
            })
            .catch(error => {
                console.error("Error submitting decisions", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <h1 className='decider-title'>Decide Whose The Owner in Your one-to-one Relationships</h1>
        <div>
            {database.map((data) => {
                const relationshipKey = data.relationship || data.name; // Use relationship if available, fallback to name

                return (



                    <div className="decider-display" key={relationshipKey}>
                        <label>
                            Decision of: {" " + data.name}
                        </label>
                        <select
                            className='fontTheme custom-select decider-select'
                            value={decisions[relationshipKey] || data.default} // Ensure the select reflects the correct value from state
                            onChange={(e) => handleDecisionChange(relationshipKey, e.target.value)} // Track decision using the relationshipKey
                        >
                            {data.options.map((option) =>{
                                return (
                                    <option value={option.id} key={option.id}>
                                        { option.id ==="bridge" ? "Create new table "+option.name: "Collapse in "+option.name}
                                    </option>
                                )
                            } )}
                        </select>

                        {/* Conditionally render primary key selection if the bridge table is selected */}
                        {decisions[relationshipKey] === 'bridge' && (
                            <div className="primary-key-selection">
                                <label>Select Primary Key for Bridge Table:</label>
                                <select
                                    className="fontTheme custom-select decider-select"
                                    value={primaryKeySelections[relationshipKey] || ""}
                                    onChange={(e) => handlePrimaryKeySelection(relationshipKey, e.target.value)}
                                >
                                    <option value="">Select a Primary Key</option>
                                    {data.options.map((primaryKey) =>{
                                        if(primaryKey.id!=='bridge'){
                                            //console.log(primaryKey)
                                            return(

                                                <option value={primaryKey.id} key={primaryKey.id}>
                                                    {primaryKey.name}
                                                </option>
                                            )
                                        }
                                    }

)}
                                </select>
                            </div>
                        )}
                    </div>
                );
            })}

            <button onClick={handleSubmit} className="decider-button">Submit Decisions</button> {/* Button to submit */}
        </div>
        </>
    );
};

export default Decider;
