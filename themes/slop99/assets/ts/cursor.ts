import { fairyDustCursor } from "cursor-effects";

window.addEventListener("load", (event) => {
  new fairyDustCursor();
});


/*
const text: string = "Klaus-Ingo's cooler Cursor";

document.addEventListener("DOMContentLoaded", function() {
    const cursorText: HTMLDivElement = document.createElement("div");
    cursorText.textContent = text;
    cursorText.style.position = "absolute";
    cursorText.style.color = "red";
    cursorText.style.fontFamily = "Comic Sans MS, sans-serif";
    cursorText.style.fontWeight = "bold";
    cursorText.style.fontSize = "16px";
    cursorText.style.pointerEvents = "none"; // Klicks gehen durch den Text durch
    cursorText.style.zIndex = "10000";
    cursorText.style.textShadow = "2px 2px yellow";
    document.body.appendChild(cursorText);

    document.addEventListener("mousemove", function(e: MouseEvent) {
        cursorText.style.left = (e.pageX + 15) + "px";
        cursorText.style.top = (e.pageY + 15) + "px";
    });
});
*/