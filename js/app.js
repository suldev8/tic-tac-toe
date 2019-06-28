
// Put slecotrs DOM into variable
const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector)

// Select start button and add click event listner
const startBtn = select('#start-button');
startBtn.addEventListener('click', function(){
    // Hide the start button
    this.style.display = 'none';
    // Select and hide button container
    const startConainer = select('div.start-container');
    startConainer.style.display = 'none';
    // Select the game table and remove the blur effect
    const gameTable = select('table.game-table');
    gameTable.style.filter = 'none';
}.apply(startBtn));


// Define a variable for players turns as bloolean true for X and false for O
let player = true;
// Select table and add clicke event listener
const gameTable = select('table.game-table');
gameTable.addEventListener('click', function(e){
    // Check the target name if it is a td tag
    const { tagName } = e.target;
    if(tagName === 'TD') {
        console.log('It is td', tagName)
    }
});



