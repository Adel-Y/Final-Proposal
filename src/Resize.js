// src/ResizableBox.js
import React, { useState, useRef } from 'react';
// import './ResizableBox.css';

const ResizableBox = () => {
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [connections, setConnections] = useState([]);
    const boxRef = useRef(null);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = boxRef.current.offsetWidth;
        const startHeight = boxRef.current.offsetHeight;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + e.clientX - startX;
            const newHeight = startHeight + e.clientY - startY;
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleVertexMouseDown = (vertexIndex, e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const handleMouseMove = (e) => {
            const endX = e.clientX;
            const endY = e.clientY;
            const newConnection = {
                startX,
                startY,
                endX,
                endY,
                vertexIndex,
            };
            setConnections((prevConnections) => [...prevConnections, newConnection]);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            ref={boxRef}
            className="resizable-box"
            style={{ width: size.width, height: size.height }}
        >
            <div className="resizer" onMouseDown={handleMouseDown}></div>
            {/* Adding vertices */}
            <div className="vertex top-left" onMouseDown={(e) => handleVertexMouseDown(0, e)}></div>
            <div className="vertex top-right" onMouseDown={(e) => handleVertexMouseDown(1, e)}></div>
            <div className="vertex bottom-left" onMouseDown={(e) => handleVertexMouseDown(2, e)}></div>
            <div className="vertex bottom-right" onMouseDown={(e) => handleVertexMouseDown(3, e)}></div>
        </div>
    );
};

export default ResizableBox;
