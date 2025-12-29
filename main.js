//Create the board
const newBoard = (function() {
    let board = [["", "", ""], ["", "", ""], ["", "", ""],];

    let checkWin = () => {
        const b = board;
        for (let i = 0; i < 3; i++) {
            if (b[i][0] !== "" && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
            if (b[0][i] !== "" && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
        }

        if (b[0][0] !== "" && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
        if (b[0][2] !== "" && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
        
        if (!b.flat().includes("")) return "tie";

        return null; 
    }

    return {
        getBoard: () => board,
        placeMarker: (x,y, player) => {
            if (board[x][y] === "") {
                board[x][y] = player;
                return true;
            } else {
                return false;
            }
        },
        checkWin,
    }
})();

//player factory function
const player = (name, marker, score) => {
    const increaseScore = () => score++;
    const getScore = () => score;
    return {
        name, marker, getScore, increaseScore
    }
}

//make the players
const playerOne = player(prompt("Player one name: "), "X", 0);
const playerTwo = player(prompt("Player two name: "), "O", 0);

const gameController = (function() {
    const players = [playerOne, playerTwo];
    let currentPlayer = players[0];

    let playerSwitch = () => {
        currentPlayer = currentPlayer === players[0] ?  players[1] : players[0];
    }

    const playRound = (x, y) => {
        const success = newBoard.placeMarker(x, y, currentPlayer.marker);
        if (success) {
            const result = newBoard.checkWin();
            
            if (result) {
                gameOver = true; 
                if (result === "tie") {
                    console.log("It's a tie!");
                } else {
                    console.log(`${currentPlayer.name} won!`);
                }
                return; 
            }

            playerSwitch();
            console.log(`It is ${currentPlayer.name}'s turn`);
        }
    }
    return {
        playRound
    }
})();

gameController.playRound(0, 0);
gameController.playRound(1,1);
gameController.playRound(0,1);
gameController.playRound(1,0);
gameController.playRound(0,2);
console.log(newBoard.getBoard());