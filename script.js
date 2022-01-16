const squares = document.getElementsByClassName('square');
const player = document.getElementById('player-toggle');
const comp_container = document.getElementById('ai-select');
const comp_enable = document.getElementById('ai-toggle');

// Add click event listener to gameboard
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', (e) => {
        console.log(e.currentTarget.getAttribute('id'));
        gameboard.display()
    });
}

// Add click event listener for setup
player.addEventListener('click', (e) => {
    if (player.checked == true) {
        comp_container.classList.add('inactive');
        comp_enable.checked = false;
    } else {
        comp_container.classList.remove('inactive');
    }
});


const gameboard = (() => {

    // Gameboard 2D array (private)
    var _board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    // Console log gameboard
    const print = () => {console.log(_board);}

    // Display gameboard to DOM
    const display = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                document.getElementById(`${i}${j}`).innerHTML = _board[i][j];
            }
        }
    }

    // Mark on gameboard
    const mark = (row, col) => {
        _board[row][col] = 'X';
    }

    return {print, display, mark};

})();

const Player = (name) => {

}


// gameboard.print();
gameboard.display();
gameboard.mark(0, 0);

//Todo
/* 
- Ability to select one player or 2 players (toggle)
- Coin to decide who goes first
- display to show whose turn it is
- AI for computer
*/