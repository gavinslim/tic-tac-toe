
/* 
Features
- [Done] Ability to select one player or 2 players (toggle)
- [Done] Display to show whose turn it is
- AI for computer
- Factory and Module functions
*/

const first_player_name = document.getElementById('p1-name');
const second_player_name = document.getElementById('p2-name');
const second_player = document.getElementById('player-toggle');
const second_player_input = document.getElementsByClassName('player-2')[0]; 
const message = document.getElementsByClassName('message')[0];
const squares = document.getElementsByClassName('square');
const start_button = document.getElementById('start');
const win_line = document.getElementById('line');

// Player and Computer Setup
second_player.addEventListener('click', (e) => {
    if (second_player.checked == true) {
        second_player_input.classList.add('active');
    } else {
        second_player_input.classList.remove('active');
    }

    gameboard.reset();
    start_button.innerHTML = 'Start';
});

// Start button 
start_button.addEventListener('click', () => {

    // Check input fields are filled
    if (first_player_name.value == '') {
        message.innerHTML = 'Missing Player 1 name!';
        return;
    }
    if ((second_player.checked == true) && (second_player_name.value == '')) {
        message.innerHTML = 'Missing Player 2 name!';
        return;
    }

    if (start_button.innerHTML == 'Start') {
        message.innerHTML = '';
    } 

    // Initialize 
    start_button.innerHTML = 'Reset';
    gameboard.reset();
    gameboard.activate();

    player1 = Player(first_player_name.value);
    player1.active = true; 

    if (second_player.checked == true) {
        player2 = Player(second_player_name.value)
    } else {
        player2 = Player('Computer');
    }
    
})

// Gameboard
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', (e) => {
        
        // Which square is written
        var coordinate = e.currentTarget.getAttribute('id');
        var row = coordinate.charAt(0);
        var col = coordinate.charAt(1);

        // Single player scenario
        if (player2.get_name() == 'Computer') {
            if (player1.active == true) {
                player1.mark(row, col, 'X');
                // player1.active = false;
            
                // Random computer selection
                let i = Math.floor(Math.random() * 3);
                let j = Math.floor(Math.random() * 3);

                let count = 0;
                while (gameboard.check_empty_space(i, j) == false) {
                    i = Math.floor(Math.random() * 3);
                    j = Math.floor(Math.random() * 3); 
                    
                    if (count >= 10) {
                        return;
                    }
                    count++;
                }

                player2.mark(i, j, 'O');
                player1.active = true;                
            }
            
        } 

        // Two player scenario
        if (player2.get_name() != 'Computer') {
            if (player1.active == true) {
                player1.mark(row, col, 'X');
                player1.active = false;
            } else {
                player2.mark(row, col, 'O');
                player1.active = true;
            }
        }
    });
}

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
        message.innerHTML = "";

        player1.active = true;
        player2.active = false;
        _active = false;      
    }

    // Activate gameboard
    const activate = () => {
        _active = true;
    }

    // Console log gameboard
    const print = () => {console.log(_board);}

    const check_empty_space = (row, col) => {
        if (_board[row][col] == '') {
            return true;
        } else {
            return false;
        }
    }

    function _empty_space_exists() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_board[i][j] == '') {
                    return true;
                } 
            }
        }
        return false;
    }

    // Mark on gameboard
    const mark = (row, col, marker) => {
        if (!_active) {return false;}   

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

        // Check if winner
        if (check(row, col, marker)) {
            return true;
        }
        
        // Check if tie 
        if (_empty_space_exists() == false) {
            message.innerHTML = "Tie!";
            _active = false;
            return false;
        }

        return false;
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
            line.classList.add('active');

            if (row == 0) {line.classList.add('row-top');}
            if (row == 2) {line.classList.add('row-bot');}
            _active = false;
            return true;
        }

        if (check_vertical(col, marker)) {
            line.classList.add('active');
            if (col == 0) {line.classList.add('col-left');}
            if (col == 1) {line.classList.add('col-mid')}
            if (col == 2) {line.classList.add('col-right');}
            _active = false;
            return true;
        }
    
        if (check_pos_diagonal(row, col, marker)) {
            line.classList.add('active', 'diag-pos');
            _active = false;
            return true;
        }

        if (check_neg_diagonal(row, col, marker)) {
            line.classList.add('active', 'diag-neg');
            _active = false;
            return true;
        }

        return false;
    }

    return {reset, activate, print, mark, check, check_empty_space};

})();


// Factory Function
const Player = (name) => {

    var active = false;
    const _name = name; 

    const mark = (row, col, marker) => {
        let temp = gameboard.mark(row, col, marker);
        if (temp == true) {
            message.innerHTML = `${name} wins!`;
        } 
    }

    const get_name = () => {
        return _name;
    }

    return {mark, get_name, active};
}

var player1 = Player('Player 1');
player1.active = true; 
var player2 = Player('Player 2');

