//Create the board
const newBoard = (function() {
    let board = [["", "", ""], ["", "", ""], ["", "", ""],];
    return {
        getBoard: () => board,
        placeMarker: (x,y, player) => {
            board[x][y] = player;
        },
    }
})();

//player factory function
const player = (name, marker, score) => {
    const increaseScore = () => score++;
    return {
        name, marker, score, increaseScore
    }
}

//make the players
const playerOne = player(prompt("Player one name: "), "X", 0);
const playerTwo = player(prompt("Player two name: "), "O", 0);

newBoard.placeMarker(0, 0, playerOne.marker)
console.log(newBoard.getBoard());
console.log(playerOne);