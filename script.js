let arr = [];
let interval;
let maxSum = 0;

function start() {
    clearInterval(interval);
    const input = document.getElementById("arrayInput").value;
    arr = input.split(",").map(Number);
    render();
    document.getElementById("info").innerText = "Ready to visualize.";
}

function render(left = -1, right = -1, wStart = -1, wEnd = -1) {
    const container = document.getElementById("arrayContainer");
    container.innerHTML = "";

    arr.forEach((val, i) => {
        const div = document.createElement("div");
        div.className = "box";
        div.innerText = val;

        if (i === left) div.classList.add("left");
        if (i === right) div.classList.add("right");
        if (i >= wStart && i <= wEnd) div.classList.add("window");

        container.appendChild(div);
    });
}

/* ---------------- TWO POINTER ---------------- */

function runTwoPointer() {
    clearInterval(interval);
    let left = 0;
    let right = arr.length - 1;
    const target = Number(document.getElementById("targetInput").value);

    interval = setInterval(() => {
        if (left >= right) {
            document.getElementById("info").innerText = "Pair not found.";
            clearInterval(interval);
            return;
        }

        const sum = arr[left] + arr[right];
        render(left, right);
        document.getElementById("info").innerText =
            `Checking: ${arr[left]} + ${arr[right]} = ${sum}`;

        if (sum === target) {
            document.getElementById("info").innerText =
                `Pair Found at indices ${left} & ${right}`;
            clearInterval(interval);
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }, 800);
}

/* ---------------- SLIDING WINDOW ---------------- */

function runSlidingWindow() {
    clearInterval(interval);
    let k = Number(document.getElementById("windowInput").value);
    let start = 0;
    let sum = 0;
    maxSum = -Infinity;

    for (let i = 0; i < k; i++) sum += arr[i];
    maxSum = sum;

    let end = k - 1;

    interval = setInterval(() => {
        if (end >= arr.length) {
            document.getElementById("info").innerText =
                `Maximum Subarray Sum = ${maxSum}`;
            clearInterval(interval);
            return;
        }

        render(-1, -1, start, end);
        document.getElementById("info").innerText =
            `Window Sum: ${sum} | Max Sum: ${maxSum}`;

        sum -= arr[start];
        start++;
        end++;

        if (end < arr.length) {
            sum += arr[end];
            maxSum = Math.max(maxSum, sum);
        }
    }, 800);
}
