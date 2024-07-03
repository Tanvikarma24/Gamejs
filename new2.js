// Create the game board
const gameBoard = document.createElement('div');
gameBoard.style.display = 'grid';
gameBoard.style.gridTemplateColumns = 'repeat(3, 100px)';
gameBoard.style.gridTemplateRows = 'repeat(3, 100px)';
gameBoard.style.gap = '5px';
document.body.appendChild(gameBoard);

// Create the reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.style.marginTop = '20px';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '1em';
resetButton.style.cursor = 'pointer';
document.body.appendChild(resetButton);

// Game variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let moveCount = 0;

// Create cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = '#fff';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.style.border = '1px solid #ccc';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moveCount++;

    if (checkWinner(index)) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (moveCount === 9) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            bestMove();
        }
    }
}

// Check winner dynamically
function checkWinner(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Check the row
    let rowCount = 0;
    for (let i = 0; i < 3; i++) {
        if (gameState[row * 3 + i] === currentPlayer) {
            rowCount++;
        }
    }
    if (rowCount === 3) return true;

    // Check the column
    let colCount = 0;
    for (let i = 0; i < 3; i++) {
        if (gameState[col + 3 * i] === currentPlayer) {
            colCount++;
        }
    }
    if (colCount === 3) return true;

    // Check the diagonals
    if ((index % 2) === 0) { // Only even index cells can be part of a diagonal
        // Check main diagonal
        let mainDiagonalCount = 0;
        for (let i = 0; i < 3; i++) {
            if (gameState[i * 3 + i] === currentPlayer) {
                mainDiagonalCount++;
            }
        }
        if (mainDiagonalCount === 3) return true;

        // Check anti-diagonal
        let antiDiagonalCount = 0;
        for (let i = 0; i < 3; i++) {
            if (gameState[i * 3 + (2 - i)] === currentPlayer) {
                antiDiagonalCount++;
            }
        }
        if (antiDiagonalCount === 3) return true;
    }

    return false;
}

// Reset game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    moveCount = 0;
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}

// AI move using backtracking with Alpha-Beta Pruning
function bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false, -Infinity, Infinity);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    gameState[move] = 'O';
    document.querySelector(`div[data-index='${move}']`).textContent = 'O';
    moveCount++;
    if (checkWinner(move)) {
        alert('Player O wins!');
    } else if (moveCount === 9) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = 'X';
    }
}

// Minimax algorithm with Alpha-Beta Pruning
function minimax(state, depth, isMaximizing, alpha, beta) {
    if (checkWinner()) {
        return isMaximizing ? -1 : 1;
    }
    if (state.every(cell => cell !== '')) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'O';
                let score = minimax(state, depth + 1, false, alpha, beta);
                state[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0;  i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'X';
                let score = minimax(state, depth + 1, true, alpha, beta);
                state[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}

///////////////////////////////////////////next

// Create the game board
const gameBoard = document.createElement('div');
gameBoard.style.display = 'grid';
gameBoard.style.gridTemplateColumns = 'repeat(3, 100px)';
gameBoard.style.gridTemplateRows = 'repeat(3, 100px)';
gameBoard.style.gap = '5px';
document.body.appendChild(gameBoard);

// Create the reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.style.marginTop = '20px';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '1em';
resetButton.style.cursor = 'pointer';
document.body.appendChild(resetButton);

// Game variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let moveCount = 0;

// Create cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = '#fff';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.style.border = '1px solid #ccc';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner(index)) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moveCount++;

    if (checkWinner(index)) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (moveCount === 9) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            bestMove();
        }
    }
}

// Check winner dynamically
function checkWinner(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const currentMove = currentPlayer;

    // Check row
    if (gameState[row * 3] === currentMove && gameState[row * 3 + 1] === currentMove && gameState[row * 3 + 2] === currentMove) {
        return true;
    }

    // Check column
    if (gameState[col] === currentMove && gameState[col + 3] === currentMove && gameState[col + 6] === currentMove) {
        return true;
    }

    // Check diagonals
    if (index % 2 === 0) { // Only check diagonals if index is on a diagonal cell
        // Check main diagonal
        if (gameState[0] === currentMove && gameState[4] === currentMove && gameState[8] === currentMove) {
            return true;
        }
        // Check anti-diagonal
        if (gameState[2] === currentMove && gameState[4] === currentMove && gameState[6] === currentMove) {
            return true;
        }
    }

    return false;
}

// Reset game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    moveCount = 0;
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}

// AI move using backtracking with Alpha-Beta Pruning
function bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false, -Infinity, Infinity);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    gameState[move] = 'O';
    document.querySelector(`div[data-index='${move}']`).textContent = 'O';
    moveCount++;
    if (checkWinner(move)) {
        alert('Player O wins!');
    } else if (moveCount === 9) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = 'X';
    }
}

// Minimax algorithm with Alpha-Beta Pruning
function minimax(state, depth, isMaximizing, alpha, beta) {
    if (checkWinner()) {
        return isMaximizing ? -1 : 1;
    }
    if (state.every(cell => cell !== '')) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'O';
                let score = minimax(state, depth + 1, false, alpha, beta);
                state[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'X';
                let score = minimax(state, depth + 1, true, alpha, beta);
                state[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}
////////////////////////////////////////////////////// must

// Use a Set for winning combinations
const winningCombinations = new Set([
    '012', '345', '678',   // Rows
    '036', '147', '258',   // Columns
    '048', '246'           // Diagonals
]);

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '') {
        return;  // Exit early if cell is already filled
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
        alert(`Player ${currentPlayer} wins!`);
        currentPlayer === 'X' ? winsX++ : winsO++;
        updateWinCount();
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to check for a winner
function checkWinner(player) {
    const playerMoves = gameState.reduce((acc, val, idx) => {
        if (val === player) {
            acc += idx;
        }
        return acc;
    }, '');

    for (const combination of winningCombinations) {
        if (combination.split('').every(index => playerMoves.includes(index))) {
            return true;
        }
    }
    return false;
}

// Reset game function
function resetGame() {
    gameState.fill('');
    currentPlayer = 'X';
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}

// Update win counts function
function updateWinCount() {
    winCounterX.textContent = `Player X Wins: ${winsX}`;
    winCounterO.textContent = `Player O Wins: ${winsO}`;
}
////////////////////////////////////////////amfjl

function checkWinner(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    
    const checks = [
        [row * 3, row * 3 + 1, row * 3 + 2],
        [col, col + 3, col + 6],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return checks.some(check =>
        check.every(i => gameState[i] === currentPlayer)
    );
}

//////////////////////////////////////////////lllll
const gameBoard = document.createElement('div');
gameBoard.style.display = 'grid';
gameBoard.style.gridTemplateColumns = 'repeat(3, 100px)';
gameBoard.style.gridTemplateRows = 'repeat(3, 100px)';
gameBoard.style.gap = '5px';
document.body.appendChild(gameBoard);

const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.style.marginTop = '20px';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '1em';
resetButton.style.cursor = 'pointer';
document.body.appendChild(resetButton);

let currentPlayer = 'X';
let gameState = new Array(9).fill('');
let rowCount = [0, 0, 0];
let colCount = [0, 0, 0];
let diagCount = [0, 0];
let playerMoves = { X: [], O: [] };

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = '#fff';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.style.border = '1px solid #ccc';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'), 10);

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    playerMoves[currentPlayer].push(index);

    const row = Math.floor(index / 3);
    const col = index % 3;

    // Update counts
    rowCount[row] += (currentPlayer === 'X') ? 1 : -1;
    colCount[col] += (currentPlayer === 'X') ? 1 : -1;
    if (row === col) diagCount[0] += (currentPlayer === 'X') ? 1 : -1;
    if (row + col === 2) diagCount[1] += (currentPlayer === 'X') ? 1 : -1;

    if (checkWinner(row, col)) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner(row, col) {
    // Check if any count reaches 3 or -3
    return Math.abs(rowCount[row]) === 3 || 
           Math.abs(colCount[col]) === 3 || 
           Math.abs(diagCount[0]) === 3 || 
           Math.abs(diagCount[1]) === 3;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState.fill('');
    currentPlayer = 'X';
    rowCount.fill(0);
    colCount.fill(0);
    diagCount.fill(0);
    playerMoves = { X: [], O: [] };
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}
/////////////////////////////////
const gameBoard = document.createElement('div');
gameBoard.style.display = 'grid';
gameBoard.style.gridTemplateColumns = 'repeat(3, 100px)';
gameBoard.style.gridTemplateRows = 'repeat(3, 100px)';
gameBoard.style.gap = '5px';
document.body.appendChild(gameBoard);

const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.style.marginTop = '20px';
resetButton.style.padding = '10px 20px';
resetButton.style.fontSize = '1em';
resetButton.style.cursor = 'pointer';
document.body.appendChild(resetButton);

let currentPlayer = 'X';
let gameState = new Array(9).fill('');
let playerMoves = { X: [], O: [] };

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.backgroundColor = '#fff';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.style.border = '1px solid #ccc';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'), 10);

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    playerMoves[currentPlayer].push(index);

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState.fill('');
    currentPlayer = 'X';
    playerMoves = { X: [], O: [] };
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}

// Minimax algorithm
function minimax(isMaximizing) {
    const winner = checkWinner();
    if (winner === 'X') return -1;
    if (winner === 'O') return 1;
    if (gameState.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O';
                const score = minimax(false);
                gameState[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'X';
                const score = minimax(true);
                gameState[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Best move for AI
function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            const score = minimax(false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    gameState[move] = 'O';
    const cell = document.querySelector(`div[data-index='${move}']`);
    cell.textContent = 'O';
    currentPlayer = 'X';
    if (checkWinner()) {
        alert('Player O wins!');
    } else if (gameState.every(cell => cell !== '')) {
        alert('It\'s a draw!');
    }
}

// Example of making the AI move
bestMove();
//////////////////////////
function checkWinner(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    return (
        (gameState[row * 3] === currentPlayer && gameState[row * 3 + 1] === currentPlayer && gameState[row * 3 + 2] === currentPlayer) ? true :
        (gameState[col] === currentPlayer && gameState[col + 3] === currentPlayer && gameState[col + 6] === currentPlayer) ? true :
        (index % 2 === 0) ?
            (gameState[0] === currentPlayer && gameState[4] === currentPlayer && gameState[8] === currentPlayer) ? true :
            (gameState[2] === currentPlayer && gameState[4] === currentPlayer && gameState[6] === currentPlayer) ? true : false
        : false
    );
}
 ///////////////////////

 function createAndAppendElement(parent, elementType, properties = {}) {
    const element = document.createElement(elementType);
    Object.assign(element, properties);
    parent.appendChild(element);
    return element;
}

const textBoxX = createAndAppendElement(scoreBox, 'div');
const textBoxO = createAndAppendElement(scoreBox, 'div');
const gameCountBox = createAndAppendElement(scoreBox, 'div');


////////////////////////

const scoreBox = Object.assign(document.createElement('div'), {
    style: {
        textAlign: 'center',
        color: 'white'
    }
});
mainDivBox.appendChild(scoreBox);

const textBoxX = scoreBox.appendChild(document.createElement('div'));
const textBoxO = scoreBox.appendChild(document.createElement('div'));
const gameCountBox = scoreBox.appendChild(document.createElement('div'));