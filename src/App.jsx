import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";

const Shape = ({ shape, color, position }) => {
    const [width, setWidth] = useState(getWidth());
    const style = {
        width: `${width}px`,
        height: `${width}px`,
        backgroundColor: color,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    useEffect(() => {
        setWidth(getWidth());
    }, [shape]);

    function getWidth() {
        const min = 10;
        const max = 275;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return <div style={style} className={shape}></div>;
};

Shape.propTypes = {
    shape: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
};

const App = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [shape, setShape] = useState("circle");
    const shapeOptions = [
        "circle",
        "square",
        "building",
        "pentagon",
        "hexagon",
        "octagon",
    ];
    const [selectedColor, setSelectedColor] = useState("#ffff00");
    const [shapes, setShapes] = useState([]);

    const addShape = (e) => {
        if (!isMouseDown) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const shapeObj = {
            shape,
            color: selectedColor,
            position: { x, y },
            id: Date.now(),
        };
        setShapes((prevShapes) => [...prevShapes, shapeObj]);
    };

    useEffect(() => {
        const handleMouseDown = () => {
            setIsMouseDown(true);
        };

        const handleMouseUp = () => {
            setIsMouseDown(false);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isMouseDown]);

    return (
        <>
            <main
                className="container"
                onMouseMove={addShape}
                onClick={addShape}
            >
                {shapes.map((s) => (
                    <Shape
                        key={s.id}
                        shape={s.shape}
                        color={s.color}
                        position={s.position}
                    />
                ))}
            </main>
            <div className="action_btn">
                <button>undo</button>
                <button>redo</button>
                <button>Clean</button>
                <div className="shape_options">
                    <select onChange={(e) => setShape(e.target.value)}>
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
};

export default App;
