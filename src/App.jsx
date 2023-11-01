import "./App.css";
import { useRef } from "react";
import { useGetAction } from "./hooks/useGetAction";
import { useGetShapes } from "./hooks/useGetShapes";

function App() {
    const containerRef = useRef(null);
    const {
        chooseShape,
        handleMouseDown,
        handleMouseUp,
        addShape,
        shapeOptions,
        elements,
        selectedColor,
        setElements,
        isMouseDown,
        setSelectedColor,
    } = useGetShapes(containerRef);
    const { handleUndo, handleRedo, handSaveDesign } = useGetAction(
        containerRef,
        elements,
        setElements
    );

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
                <button onClick={handSaveDesign}>save</button>
                <button onClick={handleUndo}>undo</button>
                <button onClick={handleRedo}>redo</button>
                <button onClick={() => setElements([])}>Clean</button>
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
