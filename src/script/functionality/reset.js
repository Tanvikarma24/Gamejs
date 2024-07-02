// reset game
resetButton.addEventListener('click', resetGame);

function resetGame(){
    gameState.fill('');
    currentPlayer = 'X';
    const cells = document.querySelectorAll('div[data-index]') ;
    cells.forEach(cells => cells.textContent = '' );
}