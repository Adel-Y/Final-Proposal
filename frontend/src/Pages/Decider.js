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
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/retrieve/relCode')
            .then(response => {
                console.log(response.data);
                setDatabase(response.data);


                setLoading(false);

                if(response.data.length===0){
                    navigate('/relational')
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

    // Function to handle selection change
    const handleDecisionChange = (relationshipKey, selectedValue) => {
        setDecisions(prevDecisions => ({
            ...prevDecisions,
            [relationshipKey]: selectedValue // Use relationship as the key
        }));
    };

    // Function to submit the decisions
    const handleSubmit = () => {
        // Convert the decisions object to an array, making sure 'relationship' and 'owner' fields are correctly formatted
        const decisionsArray = Object.keys(decisions).map(key => {
            return {
                relationship: key,
                owner: decisions[key]
            };
        });

        console.log("Decisions to send:", decisionsArray);

        // Send the decisions to the backend API
        axios.post('/retrieve/decisions', decisionsArray)
            .then(response => {
                console.log("Decisions submitted successfully", response.data);
                navigate('/relational')
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
        <div>
            {database.map((data) => {
                const relationshipKey = data.relationship || data.name; // Use relationship if available, fallback to name

                return (
                    <div className="decider-display" key={relationshipKey}>
                        <label>
                            Decision of: {" " + data.name}
                        </label>
                        <select
                            className='fontTheme custom-select'
                            value={decisions[relationshipKey] || data.default} // Ensure the select reflects the correct value from state
                            onChange={(e) => handleDecisionChange(relationshipKey, e.target.value)} // Track decision using the relationshipKey
                        >
                            {data.options.map((option) => (
                                <option value={option.id} key={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}

            <button onClick={handleSubmit}>Submit Decisions</button> {/* Button to submit */}
        </div>
    );
};

export default Decider;
