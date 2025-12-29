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
        resetBoard: () => {
            board = [["", "", ""], ["", "", ""], ["", "", ""]];
        },
    }
})();

//player factory function
const player = (name, marker, score) => {
    let currentScore = score;
    const increaseScore = () => currentScore++;
    const getScore = () => currentScore;
    return { name, marker, getScore, increaseScore };
};

//make the players
const playerOne = player(prompt("Player one name: "), "X", 0);
const playerTwo = player(prompt("Player two name: "), "O", 0);

const gameController = (function() {
    const players = [playerOne, playerTwo];
    let currentPlayer = players[0];
    let gameOver = false;

    let playerSwitch = () => {
        currentPlayer = currentPlayer === players[0] ?  players[1] : players[0];
    }

    let getCurrentPlayer = () => currentPlayer;

    const playRound = (x, y) => {
        if (gameOver) return;
        const success = newBoard.placeMarker(x, y, currentPlayer.marker);
        if (success) {
            const result = newBoard.checkWin();
            
            if (result) {
                gameOver = true; 
                if (result === "tie") {
                    console.log("It's a tie!");
                } else {
                    console.log(`${currentPlayer.name} won!`);
                    currentPlayer.increaseScore();
                    console.log(currentPlayer.getScore());
                }
                return result; 
            }

            playerSwitch();
            console.log(`It is ${currentPlayer.name}'s turn`);
        }
    }

    const resetGameStatus = () => {
    newBoard.resetBoard();
    gameOver = false;
    currentPlayer = players[0];
    displayController.updateScreen(); 
};

    return {
        playRound,
        getCurrentPlayer,
        resetGameStatus
    }
})();

const displayController = (function() {
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.getElementById('status-message');
    const resetBtn = document.querySelector('#reset-btn');
    const p1Score = document.querySelector('#p1');
    const p2Score = document.querySelector('#p2');

    p1Score.textContent = `${playerOne.name}'s score: 0`;
    p2Score.textContent = `${playerTwo.name}'s score: 0`;
    resetBtn.addEventListener('click', gameController.resetGameStatus);

    const updateScreen = (result) => {
        const board = newBoard.getBoard();
        
        cells.forEach(cell => {
            const r = cell.dataset.row;
            const c = cell.dataset.col;
            cell.textContent = board[r][c];
        });

        if (result === "tie") {
            statusDiv.textContent = "It's a tie!";
        } else if (result) {
            statusDiv.textContent = `${gameController.getCurrentPlayer().name} Wins!`;
            p1Score.textContent = `${playerOne.name}'s score: ${playerOne.getScore()}`
            p2Score.textContent = `${playerTwo.name}'s score: ${playerTwo.getScore()}`
            console.log("someone won");
        } else {
            statusDiv.textContent = `It is ${gameController.getCurrentPlayer().name}'s turn (${gameController.getCurrentPlayer().marker})`;
        }
    };

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const row = e.target.dataset.row;
            const col = e.target.dataset.col;

            const result = gameController.playRound(row, col);
            updateScreen(result);
        });
    });

    updateScreen();

    return {
        updateScreen
    }
})();

console.log(newBoard.getBoard());