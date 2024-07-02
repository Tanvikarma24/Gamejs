function checkWinner(index){
    
    const row = Math.floor(index/3);
    const col = index%3;

    if(gameState[row*3]===currentPlayer && gameState[row*3+1]===currentPlayer && gameState[row*3+2]===currentPlayer){
        return true; 
    }
    if(gameState[col]===currentPlayer && gameState[col+3]===currentPlayer && gameState[col+6]===currentPlayer){
        return true;
    }
    if(index%2==0){
        if(gameState[0]===currentPlayer && gameState[4]===currentPlayer && gameState[8] ===currentPlayer){
            return true;
        }
        if(gameState[2]===currentPlayer && gameState[4]===currentPlayer && gameState[6]===currentPlayer){
            return true;
        }
    }
    // const checks = [[row*3, row*3+1, row*3+2],[col,col+3,col+6],[0,4,8],[2,4,6]];
    // return checks.some(check =>{
    //     check.every(i => gameState[i] === currentPlayer);
    // })
    
}

