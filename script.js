const squares = document.getElementsByClassName('square');
const single_player = document.getElementById('player-toggle');
const comp_container = document.getElementById('ai-select');
const comp_enable = document.getElementById('ai-toggle');
const start_button = document.getElementById('start');
const win_line = document.getElementById('line');

// Gameboard
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', (e) => {
        
        // Which square is written
        var coordinate = e.currentTarget.getAttribute('id');
        var row = coordinate.charAt(0);
        var col = coordinate.charAt(1);

        // console.log(player1.active);
        if (player1.active == true) {
            player1.mark(row, col, 'X');
            player1.active = false;
        } else {
            player2.mark(row, col, 'O');
            player1.active = true;
        }
    });
}

// Player and Computer Setup
single_player.addEventListener('click', (e) => {
    if (single_player.checked == true) {
        // comp_container.classList.add('inactive');
        // comp_enable.checked = false;
    } else {
        // comp_container.classList.remove('inactive');
    }
});

// Start button 
start_button.addEventListener('click', () => {
    if (start_button.innerHTML == 'Start') {
        start_button.innerHTML = 'Reset';
        gameboard.activate();
    } else {
        start_button.innerHTML = 'Reset';
        gameboard.reset();
        gameboard.activate();
    }    
})


const gameboard = (() => {
    var _active = false;

    // Gameboard 2D array (private)
    var _board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    // Reset gameboard 
    const reset = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                _board[i][j] = '';
                let element = document.getElementById(`${i}${j}`);
                while(element.firstChild) element.removeChild(element.firstChild);

                // Re-add line div
                if ((i == 1) && (j == 1)) {
                    let child = document.createElement('div');
                    child.classList.add('line');
                    child.setAttribute('id', 'line');
                    element.appendChild(child);
                }
            }
        } 
        win_line.classList.remove('active');
        _active = false;      
    }

    // Activate gameboard
    const activate = () => {
        _active = true;
    }

    // Console log gameboard
    const print = () => {console.log(_board);}

    // Display gameboard to DOM
    const display = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                // let element = document.getElementById(`${i}${j}`);
                // while(element.firstChild) element.removeChild(element.firstChild);
            }
        }
    }

    // Mark on gameboard
    const mark = (row, col, marker) => {
        if (!_active) {return;}   

        // Modify gameboard array
        _board[row][col] = marker;

        // Modify front end display
        var parent = document.getElementById(`${row}${col}`);
        var child = document.createElement('div');

        if (marker == 'X') {
            child.classList.add('fas', 'fa-times');
            parent.appendChild(child);
        } else if (marker == 'O') {
            child.classList.add('fas', 'fa-circle');
            parent.appendChild(child);
            
            var child1 = document.createElement('div');
            child1.classList.add('fas', 'fa-circle', 'smaller');
            parent.appendChild(child1);
        }

        let temp = check(row, col, marker);
    }

    // Check horizontal
    function check_horizontal(row, marker) {

        let i = row;
        let horizontal_win = true;
        for (let j = 0; j < 3; j++) {
            if (_board[i][j] != marker) {
                horizontal_win = false;
                break;
            }
        }
        return horizontal_win;
    }

    // Check vertical
    function check_vertical(col, marker) {

        let j = col;
        let vertical_win = true;
        for (let i = 0; i < 3; i++) {
            if (_board[i][j] != marker) {
                vertical_win = false;
                break;
            }
        }
        return vertical_win;
    }

    // Check diagonal
    function check_pos_diagonal(row, col, marker) {
        let pos_diag_win = true;

        // Skip if [0,1], [1,0], [1,2], [2,1]
        if ((row == 1) != (col == 1)) {return false;}

        // Skip if [0,0], [2,2]
        if ((row == col) && (row != 1)) {return false;}

        for (let i = 2; i >= 0; i--) {
            let j = 2 - i;
            if (_board[i][j] != marker) {
                pos_diag_win = false;
                break;
            }
        }
        return pos_diag_win;
    }

    // Check diagonal
    function check_neg_diagonal(row, col, marker) {
        let neg_diag_win = true;

        // Skip if [0,1], [1,0], [1,2], [2,1]
        if ((row == 1) != (col == 1)) {return false;}

        // Skip if [2,0], [0,2]
        if (!(row == col)) {return false;}

        for (let i = 0; i < 3; i++) {
            let j = i;
            if (_board[i][j] != marker) {
                neg_diag_win = false;
                break;
            }
        }      
        return neg_diag_win; 
    }

    const check = (row, col, marker) => {
        const line = document.getElementById('line');

        if (check_horizontal(row, marker)) {
            console.log(`${marker} wins! Horizontal win`);
            line.classList.add('active');

            if (row == 0) {line.classList.add('row-top');}
            if (row == 2) {line.classList.add('row-bot');}
            
            _active = false;
        }

        if (check_vertical(col, marker)) {
            console.log(`${marker} wins! Vertical win`);
            line.classList.add('active');

            if (col == 0) {line.classList.add('col-left');}
            if (col == 1) {line.classList.add('col-mid')}
            if (col == 2) {line.classList.add('col-right');}

            _active = false;
        }
    
        if (check_pos_diagonal(row, col, marker)) {
            console.log(`${marker} wins! Positive diagonal win`);
            line.classList.add('active', 'diag-pos');
            _active = false;
        }

        if (check_neg_diagonal(row, col, marker)) {
            console.log(`${marker} wins! Negative diagonal win`);
            line.classList.add('active', 'diag-neg');
            _active = false;
        }
    }

    return {reset, activate, print, mark, check};

})();

const Player = (name) => {

    var active = false;

    const mark = (row, col, marker) => {
        gameboard.mark(row, col, marker);
    }

    const get_name = () => {
        console.log(name);
    }

    return {mark, get_name, active};
}

const player1 = Player('Gavin');
player1.active = true;
const player2 = Player('Gabriel');


//Todo
/* 
- Ability to select one player or 2 players (toggle)
- Coin to decide who goes first
- display to show whose turn it is
- AI for computer
*/