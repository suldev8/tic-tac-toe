
'use strict'

// Declare img sources constants
const xPath = 'images/x-icon.svg';
const oPath = 'images/o-icon.svg';
const restartPath = 'images/restart-icon.svg';

// Define a variable for players turns as bloolean true for X and false for O
let turn = true;

//
// Event Listener clallback functions 
//

const startGame = function () {
    // Hide the start button
    this.style.display = 'none';
    // Select and hide button container
    const startConainer = document.querySelector('div.start-container');
    startConainer.style.display = 'none';
    // Select the game table and remove the blur effect
    const gameTable = document.querySelector('table.game-table');
    gameTable.style.filter = 'none';
    playGame();
    this.removeEventListener('click', startGame);
};


const restartGame = function () {
    const gameTableBody = document.querySelector('table.game-table>tbody');
    gameTableBody.removeEventListener('click', drawInCell);
    clearGameTable();
    const scoreX = document.querySelector('#score-x');
    const scoreO = document.querySelector('#score-o');
    scoreX.innerText = 0;
    scoreO.innerText = 0;
}

const drawInCell = function (e) {
    const statusHeading = document.querySelector('div.game-status > h1');
    // Check the target name if it is a td tag
    const { tagName, name } = e.target;
    if (tagName === 'TD' && !name) {
        drawXO(e.target, turn);
        e.target.classList.remove('pointer');
        turn = !turn;
        writeHeading();
        const state = checkState(this.children);
        if (state !== '') {
            this.removeEventListener('click', drawInCell);
            // Add elements for the winner and tie
            if (state === 'tie') {
                statusHeading.innerText = 'It\'s tie';
            }
            else {
                const winnerScore = document.querySelector(`#score-${state}`);
                winnerScore.innerText = Number(winnerScore.innerText) + 1;
                statusHeading.innerText = `The winner is ${state.toUpperCase()}`;
            }

            turn = true;
            // clear table after 3 seconds
            setTimeout(clearGameTable, 3000);
            return;
        }
    }
}


const playGame = function () {

    // Create a restart button and preppend to the main
    const restartBtn = document.querySelector('button.restart-button');

    restartBtn.style.backgroundColor = '#f59b42';
    restartBtn.style.cursor = 'pointer';
    restartBtn.addEventListener('click', restartGame);

    writeHeading();

    // Select table body and add click event listener
    const gameTableBody = document.querySelector('table.game-table > tbody');
    gameTableBody.addEventListener('click', drawInCell);
}

// Select start button and add click event listner
const startBtn = document.querySelector('#start-button');
startBtn.addEventListener('click', startGame);


const hideStatus = function (status) {
    status.style.top = 0;
}

const drawXO = function (cell, turn) {
    const newImg = document.createElement('img');
    newImg.src = turn ? xPath : oPath;
    cell.name = turn ? 'x' : 'o';
    cell.appendChild(newImg);
}

const checkState = function (tableRows) {
    // Declare ariable that counts full rows and colums to check the game if it is tie
    let colRowCounter = 0;

    // Check the cross state
    const topLeft = tableRows[0].children[0].name;
    const middle = tableRows[1].children[1].name;
    const bottomRight = tableRows[2].children[2].name;

    const topRight = tableRows[0].children[2].name;
    const bottomLeft = tableRows[2].children[0].name;

    if (topLeft && middle && bottomRight) {
        if (topLeft === middle && middle === bottomRight) {
            const winner = topLeft;
            return winner;
        }
    }
    if (topRight && middle && bottomRight) {
        if (topRight === middle && middle === bottomLeft) {
            const winner = topRight;
            return winner;
        }
    }

    // Grab first row and loop through each column and compare them to the first index;
    const { length } = tableRows[0].children
    for (let i = 0; i < length; i++) {
        const firstInRow = tableRows[0].children[i].name;
        const secondInRow = tableRows[1].children[i].name
        const thirdInRow = tableRows[2].children[i].name
        if (firstInRow && secondInRow && thirdInRow) {
            colRowCounter++;
            if (firstInRow === secondInRow && secondInRow === thirdInRow) {
                const winner = firstInRow;
                return winner;
            }
        }

        const firstInCol = tableRows[i].children[0].name;
        const secondInCol = tableRows[i].children[1].name;
        const thirdInCol = tableRows[i].children[2].name;
        if (firstInCol && secondInCol && thirdInCol) {
            colRowCounter++;
            if (firstInCol === secondInCol && secondInCol === thirdInCol) {
                const winner = firstInCol;
                return winner;
            }
        }
        if (colRowCounter === 6) {
            return 'tie';
        }
    }
    return '';
};

const clearGameTable = function () {
    const gameTableBody = document.querySelector('table.game-table > tbody');

    const tableRows = gameTableBody.children;
    for (const row of tableRows) {
        for (const cell of row.children) {
            if (cell.childElementCount !== 0) {
                cell.name = '';
                cell.classList.add('pointer')
                cell.querySelector('img').remove();
            }
        }
    }
    turn = true;
    writeHeading();
    gameTableBody.addEventListener('click', drawInCell);
}

const writeHeading = function () {
    const statusHeading = document.querySelector('div.game-status > h1');
    statusHeading.innerText = `${(turn ? 'X' : 'O').toUpperCase()} turn`;
}