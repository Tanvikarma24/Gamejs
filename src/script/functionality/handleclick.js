let winX = 0;
let winO = 0;
let gameCount=0;

function handleCellClick(e){
    const cellValue = e.target;
    
    
    const index = parseInt(cellValue.getAttribute('data-index'),10);
   
    if(gameState[index] !==''|| checkWinner()){
        return;
    }

    gameState[index] = currentPlayer;
    cellValue.textContent = currentPlayer;
   
    if(checkWinner(index)){
        gameCount++;
        if(currentPlayer === 'X'){
            winX++;
            textBoxX.textContent = `Player X wins ${winX}`;
            alert(`player ${currentPlayer} wins`)
        }
        else{
            winO++;
            textBoxO.textContent = `Player O wins ${winO}`;
            alert(`player ${currentPlayer} wins`)
        }
        gameCountBox.textContent = `Games are played ${gameCount}`;
    }
    else if(gameState.every(cellValue => cellValue !== '')){
        alert('its a drow')
    }
    else{
       currentPlayer = currentPlayer === 'X'? 'O' :'X' ;
    }
    
}
