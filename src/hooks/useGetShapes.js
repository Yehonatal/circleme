// useGetShapes.js
import { useState } from "react";

export const useGetShapes = (containerRef) => {
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

    const getWidth = () => {
        const min = 10;
        const max = 350;
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

        const newElement = {
            shape: shape,
            width: getWidth(),
            color: selectedColor,
            x: x,
            y: y,
        };

        setElements((prevElements) => [...prevElements, newElement]);
    };

    return {
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
    };
};
