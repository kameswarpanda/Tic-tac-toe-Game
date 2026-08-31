//access all elements to java script
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator"); // New selector for turn indicator

let playerO = true; // true for Player O, false for Player X
let gameCount = 0; // To track filled boxes for draw condition

//logic patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable and clear all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Clear custom color set by player
    }
};

// To show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnIndicator.classList.add("hide"); // Hide turn indicator when game ends
};

// To show a draw message
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnIndicator.classList.add("hide"); // Hide turn indicator when game ends
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true; // Winner found
            }
        }
    }
    return false; // No winner yet
};

// Check game status (winner or draw)
const checkGameStatus = () => {
    let winnerFound = checkWinner();
    if (!winnerFound && gameCount === 9) {
        showDraw();
    }
};

// Reset game function
const resetGame = () => {
    playerO = true;
    gameCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Player O's Turn";
    turnIndicator.classList.remove("hide"); // Show turn indicator
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.disabled) return; // Prevent clicking already filled boxes

        if (playerO) {
            box.innerText = "O";
            box.style.color = "var(--player-o-color)"; // Use CSS variable for color
        } else {
            box.innerText = "X";
            box.style.color = "var(--player-x-color)"; // Use CSS variable for color
        }
        box.disabled = true;
        gameCount++;

        // Toggle player for next turn *before* updating indicator for the new current player
        playerO = !playerO;

        // Update turn indicator for the *new* current player, if game is not over
        if (gameCount < 9) { 
            turnIndicator.innerText = playerO ? "Player O's Turn" : "Player X's Turn";
        }

        checkGameStatus();
    });
});

// Event listeners for New Game and Reset Game buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initial game setup
resetGame();