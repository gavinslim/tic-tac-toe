const squares = document.getElementsByClassName('square');
const single_player = document.getElementById('player-toggle');
const comp_container = document.getElementById('ai-select');
const comp_enable = document.getElementById('ai-toggle');
const start_button = document.getElementById('start');

// Gameboard
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', (e) => {
        
        // Which square is written
        var coordinate = e.currentTarget.getAttribute('id');
        var row = coordinate.charAt(0);
        var col = coordinate.charAt(1);

        // console.log(player1.active);
        if (player1.active == true) {
            // console.log('true');
            player1.mark(row, col, 'X');
            player1.active = false;
        } else {
            // console.log('false');
            player2.mark(row, col, 'O');
            player1.active = true;
        }
        
    });
}

// Player and Computer Setup
single_player.addEventListener('click', (e) => {
    if (single_player.checked == true) {
        comp_container.classList.add('inactive');
        comp_enable.checked = false;
    } else {
        comp_container.classList.remove('inactive');
    }
});

// Start button 
start_button.addEventListener('click', () => {
    if (start_button.innerHTML == 'Start') {
        start_button.innerHTML = 'Reset';
        gameboard.activate();
    } else {
        start_button.innerHTML = 'Start';
        gameboard.reset();
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
            }
        } 
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
    }

    return {reset, activate, print, mark};

})();

const Player = (name) => {
    // <i class="fas fa-times"></i>

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