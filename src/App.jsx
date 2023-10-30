import { useState, useRef } from "react";
import "./App.css";

function App() {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [shape, setShape] = useState("circle");
    const shapeOptions = [
        "circle",
        "square",
        "triangle",
        "pentagon",
        "hexagon",
        "octagon",
    ];
    const [selectedColor, setSelectedColor] = useState("#ffff00");
    const [elements, setElements] = useState([]);

    const containerRef = useRef(null);

    const getWidth = () => {
        const min = 10;
        const max = 275;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const chooseShape = (choice) => {
        setShape(choice);
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const addShape = (e) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - getWidth() / 2;
        const y = e.clientY - rect.top - getWidth() / 2;

        // if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

        const newElement = {
            shape: shape,
            width: getWidth(),
            color: selectedColor,
            x: x,
            y: y,
        };

        setElements((prevElements) => [...prevElements, newElement]);
    };

    return (
        <>
            <main
                ref={containerRef}
                className="container"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={(e) => {
                    if (isMouseDown) {
                        addShape(e);
                    }
                }}
                onClick={(e) => {
                    if (!isMouseDown) {
                        addShape(e);
                    }
                }}
            >
                {elements.map((element, index) => (
                    <div
                        key={index}
                        className={element.shape}
                        style={{
                            width: `${element.width}px`,
                            height: `${element.width}px`,
                            position: "absolute",
                            backgroundColor: element.color,
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                        }}
                    ></div>
                ))}
            </main>
            <div className="action_btn">
                <button>undo</button>
                <button>redo</button>
                <button
                    onClick={() => {
                        setElements([]);
                    }}
                >
                    Clean
                </button>
                <div className="shape_options">
                    <select onChange={(e) => chooseShape(e.target.value)}>
                        {shapeOptions.map((shape, index) => (
                            <option key={index} value={shape}>
                                {shape}
                            </option>
                        ))}
                    </select>
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
