const game = {
    gameBoard: [null, null, null, null, null, null, null, null, null],
    winner: null
};

const player = (name, symbol, isTurn) => {
    return {name, symbol, isTurn}    
};

const player1 = player('Player 1', 'X', true);
const player2 = player('Player 2', 'O', false);

const gameDisplay = document.querySelector('#gamestatus');
gameDisplay.textContent = "Player 1 (x), it's your turn";

const gameCells = Array.from(document.querySelectorAll(".cell"));

const checkForWinner = (player) => {
    const board = game.gameBoard;
    const symbol = player.symbol;
    const winScenarios = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    if(winScenarios.some((group) => {
        let testCase = [];
        group.forEach(element => {
            if(board[element] !== null){
                testCase.push(board[element]);
            }
        })
       if(testCase.length == 3) {
           if(testCase.every(tile => {
               return tile == symbol;
           })){
               game.winner = player.name;
               return true;
           }
       }
    })) gameDisplay.textContent = ("The Winner is " + game.winner);

    else if(board.every(element => {
        return element !== null;
    })) gameDisplay.textContent = ("It's a tie!");
    
};

const reset = () => {
    game.gameBoard = [null, null, null, null, null, null, null, null, null];
    gameCells.forEach(cell => {
        cell.textContent = '';
    });
    game.winner = null;
    player1.isTurn = true;
    player2.isTurn = false;
    gameDisplay.textContent = "Player 1 (X), it's your turn.";
}

gameCells.forEach((cell) => {
    cell.addEventListener('click', () => {
        let index = gameCells.indexOf(cell);
        if((game.gameBoard[index] == null) && (game.winner == null)){
            if(player1.isTurn == true){
                cell.textContent = player1.symbol;
                game.gameBoard[index] = player1.symbol;
                    player1.isTurn = false;
                    player2.isTurn = true;
                    gameDisplay.textContent = "Player 2 (O), it's your turn."
                    checkForWinner(player1);
    
            } else if (player2.isTurn == true){
                cell.textContent = player2.symbol;
                game.gameBoard[index] = player2.symbol;
                    player2.isTurn = false;
                    player1.isTurn = true;
                    gameDisplay.textContent = "Player 1 (X), it's your turn."
                    checkForWinner(player2);
            }
        }
    })
});