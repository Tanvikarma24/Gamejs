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
let moveCount = { X: 0, O: 0 };

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
    moveCount[currentPlayer]++;

    if (moveCount[currentPlayer] >= 2 && checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
    } else if (moveCount.X + moveCount.O === 9) {
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
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
    moveCount = { X: 0, O: 0 };
    const cells = document.querySelectorAll('div[data-index]');
    cells.forEach(cell => cell.textContent = '');
}
