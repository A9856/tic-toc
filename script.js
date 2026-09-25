// ============================================================
// TWO PLAYER SYMBOL GAME
// ============================================================


// ============================================================
// 1. GET HTML ELEMENTS
// ============================================================

// Gets Player 1 name input.
const player1NameInput = document.getElementById("player1Name");

// Gets Player 1 symbol input.
const player1SymbolInput = document.getElementById("player1Symbol");

// Gets Player 1 error message element.
const player1Error = document.getElementById("player1Error");

// Gets Player 1 activation button.
const activatePlayer1Btn =
    document.getElementById("activatePlayer1Btn");


// Gets Player 2 setup section.
const player2Setup =
    document.getElementById("player2Setup");

// Gets Player 2 name input.
const player2NameInput =
    document.getElementById("player2Name");

// Gets Player 2 symbol input.
const player2SymbolInput =
    document.getElementById("player2Symbol");

// Gets Player 2 error message element.
const player2Error =
    document.getElementById("player2Error");

// Gets Player 2 activation button.
const activatePlayer2Btn =
    document.getElementById("activatePlayer2Btn");


// Gets Start Game button.
const startGameBtn =
    document.getElementById("startGameBtn");


// Gets setup section.
const setupSection =
    document.getElementById("setupSection");

// Gets game section.
const gameSection =
    document.getElementById("gameSection");


// Gets current active player name element.
const activePlayerName =
    document.getElementById("activePlayerName");

// Gets active player's symbol element.
const activePlayerSymbol =
    document.getElementById("activePlayerSymbol");

// Gets hint message.
const hintMessage =
    document.getElementById("hintMessage");


// Gets Player 1 score elements.
const scorePlayer1Name =
    document.getElementById("scorePlayer1Name");

const scorePlayer1Symbol =
    document.getElementById("scorePlayer1Symbol");

const scorePlayer1 =
    document.getElementById("scorePlayer1");


// Gets Player 2 score elements.
const scorePlayer2Name =
    document.getElementById("scorePlayer2Name");

const scorePlayer2Symbol =
    document.getElementById("scorePlayer2Symbol");

const scorePlayer2 =
    document.getElementById("scorePlayer2");


// Gets all game board cells.
const cells =
    document.querySelectorAll(".cell");


// Gets result box.
const resultBox =
    document.getElementById("resultBox");

// Gets result title.
const resultTitle =
    document.getElementById("resultTitle");

// Gets result message.
const resultMessage =
    document.getElementById("resultMessage");

// Gets Next Game button.
const nextGameBtn =
    document.getElementById("nextGameBtn");

// Gets New Session button.
const newSessionBtn =
    document.getElementById("newSessionBtn");


// ============================================================
// 2. GAME VARIABLES
// ============================================================


// Stores Player 1 information.
let player1 = {

    // Player 1 name.
    name: "",

    // Player 1 selected symbol.
    symbol: "",

    // Player 1 score.
    score: 0

};


// Stores Player 2 information.
let player2 = {

    // Player 2 name.
    name: "",

    // Player 2 selected symbol.
    symbol: "",

    // Player 2 score.
    score: 0

};


// Stores which player is currently playing.
let currentPlayer = 1;


// Stores board values.
let board = [

    "", "", "",

    "", "", "",

    "", "", ""

];


// Stores whether current game is running.
let gameActive = false;


// ============================================================
// 3. ALLOWED SYMBOLS
// ============================================================


// Only these two symbols are allowed.
const allowedSymbols = ["X", "0"];


// ============================================================
// 4. PLAYER 1 ACTIVATION
// ============================================================


// Adds click event to Player 1 activation button.
activatePlayer1Btn.addEventListener("click", function () {

    // Removes old error message.
    player1Error.textContent = "";


    // Gets entered Player 1 name.
    const name =
        player1NameInput.value.trim();


    // Gets entered symbol.
    const symbol =
        player1SymbolInput.value.trim();


    // Checks whether name is empty.
    if (name === "") {

        // Shows error.
        player1Error.textContent =
            "Please enter Player 1 name.";

        // Stops the function.
        return;
    }


    // Checks whether symbol is allowed.
    if (!allowedSymbols.includes(symbol)) {

        // Shows error message.
        player1Error.textContent =
            "Invalid symbol! Please enter only X or 0.";

        // Clears invalid input.
        player1SymbolInput.value = "";

        // Focuses symbol input.
        player1SymbolInput.focus();

        // Stops function.
        return;
    }


    // Saves Player 1 name.
    player1.name = name;


    // Saves Player 1 selected symbol.
    player1.symbol = symbol;


    // Shows success message.
    player1Error.textContent =
        `Player 1 activated with symbol "${symbol}".`;


    // Changes error text color to success color.
    player1Error.style.color = "#86efac";


    // Disables Player 1 name after activation.
    player1NameInput.disabled = true;


    // Disables Player 1 symbol after activation.
    player1SymbolInput.disabled = true;


    // Disables Player 1 activation button.
    activatePlayer1Btn.disabled = true;


    // Activates Player 2 setup.
    player2Setup.classList.remove("disabled-section");


    // Enables Player 2 name input.
    player2NameInput.disabled = false;


    // Enables Player 2 symbol input.
    player2SymbolInput.disabled = false;


    // Enables Player 2 activation button.
    activatePlayer2Btn.disabled = false;


    // Finds remaining symbol for Player 2.
    const remainingSymbol =
        player1.symbol === "X" ? "0" : "X";


    // Shows hint to Player 2.
    player2SymbolInput.placeholder =
        `Your available symbol is ${remainingSymbol}`;


    // Shows message.
    player2Error.textContent =
        `Player 2 must use "${remainingSymbol}".`;


    // Restores error message color.
    player2Error.style.color = "#bfdbfe";

});


// ============================================================
// 5. PLAYER 2 ACTIVATION
// ============================================================


// Adds click event to Player 2 activation button.
activatePlayer2Btn.addEventListener("click", function () {

    // Removes old error.
    player2Error.textContent = "";


    // Gets Player 2 name.
    const name =
        player2NameInput.value.trim();


    // Gets Player 2 symbol.
    const symbol =
        player2SymbolInput.value.trim();


    // Checks Player 2 name.
    if (name === "") {

        // Shows error.
        player2Error.textContent =
            "Please enter Player 2 name.";

        // Stops function.
        return;
    }


    // Checks symbol format.
    if (!allowedSymbols.includes(symbol)) {

        // Shows error.
        player2Error.textContent =
            "Invalid symbol! Please enter only X or 0.";

        // Clears invalid symbol.
        player2SymbolInput.value = "";

        // Focuses symbol input.
        player2SymbolInput.focus();

        // Stops function.
        return;
    }


    // Checks whether Player 2 selected same symbol.
    if (symbol === player1.symbol) {

        // Shows duplicate symbol error.
        player2Error.textContent =
            `You cannot use "${symbol}". ` +
            `Player 1 already selected it.`;

        // Clears duplicate symbol.
        player2SymbolInput.value = "";

        // Focuses input.
        player2SymbolInput.focus();

        // Stops function.
        return;
    }


    // Saves Player 2 name.
    player2.name = name;


    // Saves Player 2 symbol.
    player2.symbol = symbol;


    // Shows activation success.
    player2Error.textContent =
        `Player 2 activated with symbol "${symbol}".`;


    // Changes message color.
    player2Error.style.color = "#86efac";


    // Disables Player 2 name.
    player2NameInput.disabled = true;


    // Disables Player 2 symbol.
    player2SymbolInput.disabled = true;


    // Disables Player 2 activation button.
    activatePlayer2Btn.disabled = true;


    // Enables Start Game button.
    startGameBtn.disabled = false;

});


// ============================================================
// 6. START GAME
// ============================================================


// Adds click event to Start Game button.
startGameBtn.addEventListener("click", function () {

    // Checks whether both players are activated.
    if (
        player1.name === "" ||
        player2.name === "" ||
        player1.symbol === "" ||
        player2.symbol === ""
    ) {

        // Stops game start.
        return;
    }


    // Hides setup section.
    setupSection.classList.add("hidden");


    // Shows game section.
    gameSection.classList.remove("hidden");


    // Updates scoreboard.
    updateScoreBoard();


    // Starts first game.
    startNewGame();

});


// ============================================================
// 7. START NEW GAME
// ============================================================


function startNewGame() {

    // Creates empty board.
    board = [

        "", "", "",

        "", "", "",

        "", "", ""

    ];


    // Sets Player 1 as first player.
    currentPlayer = 1;


    // Makes game active.
    gameActive = true;


    // Hides previous result.
    resultBox.classList.add("hidden");


    // Clears all board cells.
    cells.forEach(function (cell) {

        // Removes text.
        cell.textContent = "";

        // Enables cell.
        cell.disabled = false;

        // Removes winning class.
        cell.classList.remove("winner");

    });


    // Updates active player information.
    updateTurnInfo();

}


// ============================================================
// 8. UPDATE TURN INFORMATION
// ============================================================


function updateTurnInfo() {

    // Gets current player object.
    const player =
        currentPlayer === 1 ? player1 : player2;


    // Shows current player name.
    activePlayerName.textContent =
        player.name;


    // Shows current player's symbol.
    activePlayerSymbol.textContent =
        player.symbol;


    // Shows symbol reminder.
    hintMessage.textContent =
        `Reminder: You selected "${player.symbol}". ` +
        `Enter only "${player.symbol}" for your moves.`;

}


// ============================================================
// 9. BOARD CELL CLICK
// ============================================================


// Runs for every board cell.
cells.forEach(function (cell) {

    // Adds click event to each cell.
    cell.addEventListener("click", function () {

        // Stops if game is not active.
        if (!gameActive) {
            return;
        }


        // Gets clicked cell index.
        const index =
            Number(cell.dataset.index);


        // Prevents already occupied cell.
        if (board[index] !== "") {

            // Shows temporary hint.
            hintMessage.textContent =
                "This cell is already occupied. Choose another cell.";

            // Stops function.
            return;
        }


        // Gets current player's information.
        const player =
            currentPlayer === 1 ? player1 : player2;


        // Places player's selected symbol.
        board[index] = player.symbol;


        // Displays symbol inside cell.
        cell.textContent = player.symbol;


        // Disables selected cell.
        cell.disabled = true;


        // Checks whether player has won.
        const winningCombination =
            checkWinner();


        // If winner exists.
        if (winningCombination) {

            // Calls winner function.
            finishGame(player, winningCombination);

            // Stops further execution.
            return;
        }


        // Checks whether board is completely filled.
        if (board.every(function (value) {

            // Returns true for every occupied cell.
            return value !== "";

        })) {

            // Calls draw function.
            finishDraw();

            // Stops further execution.
            return;
        }


        // Changes player.
        currentPlayer =
            currentPlayer === 1 ? 2 : 1;


        // Updates active player reminder.
        updateTurnInfo();

    });

});


// ============================================================
// 10. CHECK WINNER
// ============================================================


function checkWinner() {

    // All possible winning combinations.
    const winningPatterns = [

        // Top row.
        [0, 1, 2],

        // Middle row.
        [3, 4, 5],

        // Bottom row.
        [6, 7, 8],

        // Left column.
        [0, 3, 6],

        // Middle column.
        [1, 4, 7],

        // Right column.
        [2, 5, 8],

        // Diagonal.
        [0, 4, 8],

        // Other diagonal.
        [2, 4, 6]

    ];


    // Checks every winning pattern.
    for (const pattern of winningPatterns) {

        // Gets first cell.
        const first =
            board[pattern[0]];


        // Gets second cell.
        const second =
            board[pattern[1]];


        // Gets third cell.
        const third =
            board[pattern[2]];


        // Checks all three cells.
        if (
            first !== "" &&
            first === second &&
            second === third
        ) {

            // Returns winning pattern.
            return pattern;

        }

    }


    // Returns null if no winner exists.
    return null;

}


// ============================================================
// 11. FINISH GAME / WINNER
// ============================================================


function finishGame(player, winningCombination) {

    // Stops the game.
    gameActive = false;


    // Adds one point to winner.
    player.score++;


    // Updates scoreboard.
    updateScoreBoard();


    // Highlights winning cells.
    winningCombination.forEach(function (index) {

        // Adds winner class.
        cells[index].classList.add("winner");

    });


    // Disables all remaining cells.
    cells.forEach(function (cell) {

        // Disables cell.
        cell.disabled = true;

    });


    // Shows winner title.
    resultTitle.textContent =
        `🎉 ${player.name} Wins!`;


    // Shows winner message.
    resultMessage.textContent =
        `${player.name} completed 3 "${player.symbol}" ` +
        `symbols in one line and received +1 point.`;


    // Shows result box.
    resultBox.classList.remove("hidden");


    // Updates turn message.
    hintMessage.textContent =
        `Game complete! ${player.name} is the winner.`;

}


// ============================================================
// 12. DRAW GAME
// ============================================================


function finishDraw() {

    // Stops the game.
    gameActive = false;


    // Shows draw title.
    resultTitle.textContent =
        "🤝 Game Draw";


    // Shows draw message.
    resultMessage.textContent =
        "All cells are filled, but no player completed a row.";


    // Shows result box.
    resultBox.classList.remove("hidden");


    // Updates hint.
    hintMessage.textContent =
        "Game complete! No point was awarded.";

}


// ============================================================
// 13. UPDATE SCORE BOARD
// ============================================================


function updateScoreBoard() {

    // Updates Player 1 name.
    scorePlayer1Name.textContent =
        player1.name;


    // Updates Player 1 symbol.
    scorePlayer1Symbol.textContent =
        player1.symbol;


    // Updates Player 1 score.
    scorePlayer1.textContent =
        player1.score;


    // Updates Player 2 name.
    scorePlayer2Name.textContent =
        player2.name;


    // Updates Player 2 symbol.
    scorePlayer2Symbol.textContent =
        player2.symbol;


    // Updates Player 2 score.
    scorePlayer2.textContent =
        player2.score;

}


// ============================================================
// 14. NEXT GAME
// ============================================================


// Adds click event to Next Game button.
nextGameBtn.addEventListener("click", function () {

    // Starts another game.
    startNewGame();

});


// ============================================================
// 15. NEW SESSION
// ============================================================


// Adds click event to New Session button.
newSessionBtn.addEventListener("click", function () {

    // Reloads complete page.
    location.reload();

});