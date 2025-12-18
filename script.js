let array = [];
let left = 0;
let right = 0;
let intervalId = null;
let windowSize = 3; // default sliding window

function startVisualization() {
    const input = document.getElementById("arrayInput").value;
    if (!input) return alert("Please enter an array!");
    array = input.split(",").map(Number);
    left = 0;
    right = array.length - 1;
    clearInterval(intervalId);
    renderArray();
    document.getElementById("info").innerText = "Visualization ready. Choose an animation.";
}

// Render array with optional pointers or window
function renderArray(leftPointer = null, rightPointer = null, windowStart = null, windowEnd = null) {
    const container = document.getElementById("arrayContainer");
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const div = document.createElement("div");
        div.className = "array-element";
        div.innerText = array[i];

        if (i === leftPointer) div.classList.add("pointer-left");
        if (i === rightPointer) div.classList.add("pointer-right");
        if (windowStart !== null && windowEnd !== null && i >= windowStart && i < windowEnd) div.classList.add("pointer-window");

        container.appendChild(div);
    }
}

// Animate Two Pointer
function startTwoPointer() {
    if (array.length === 0) return alert("Enter array first!");
    clearInterval(intervalId);
    left = 0;
    right = array.length - 1;

    intervalId = setInterval(() => {
        if (left <= right) {
            renderArray(left, right);
            document.getElementById("info").innerText = `Two Pointer | Left: ${left}, Right: ${right}, Sum: ${array[left] + array[right]}`;
            left++;
            right--;
        } else {
            clearInterval(intervalId);
            document.getElementById("info").innerText += " | Finished!";
        }
    }, 800);
}

// Animate Sliding Window
function startSlidingWindow() {
    if (array.length === 0) return alert("Enter array first!");
    clearInterval(intervalId);
    left = 0;

    intervalId = setInterval(() => {
        if (left + windowSize <= array.length) {
            const sum = array.slice(left, left + windowSize).reduce((a, b) => a + b, 0);
            renderArray(null, null, left, left + windowSize);
            document.getElementById("info").innerText = `Sliding Window | Window [${left}-${left + windowSize - 1}] Sum: ${sum}`;
            left++;
        } else {
            clearInterval(intervalId);
            document.getElementById("info").innerText += " | Finished!";
        }
    }, 800);
}
