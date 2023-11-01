// useGetAction.js
import { useState } from "react";
import html2canvas from "html2canvas";

export const useGetAction = (containerRef, elements, setElements) => {
    const [lastPop, setLastPop] = useState([]);

    const handleUndo = () => {
        if (elements.length === 0) return;

        const newElements = [...elements];
        const popped = newElements.pop();
        setLastPop([...lastPop, popped]);
        setElements(newElements);
    };

    const handleRedo = () => {
        if (lastPop.length === 0) return;

        const lastPopped = lastPop[lastPop.length - 1];
        setElements([...elements, lastPopped]);
        setLastPop(lastPop.slice(0, -1));
    };

    const handSaveDesign = () => {
        const container = containerRef.current;
        if (!container) return;
        html2canvas(container).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = imgData;
            const fileName = prompt("Enter file name", "canvas_image");
            if (fileName === null) return; // If the user cancels the prompt
            link.download = `${fileName}.jpg`;
            link.click();
        });
    };

    return { handleUndo, handleRedo, handSaveDesign };
};
