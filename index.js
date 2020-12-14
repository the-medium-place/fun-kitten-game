// GRAB ALL REQUIRED HTML ELEMENTS 
var picBox = $('#pic-box');
var kittenPic = $("#kitten-pic");
var startBtn = $("#start-btn");
var clickBtn = $("#click-btn");
var kittenDesc = $("#kitten-desc");
var timerTxt = $("#timer-txt");
var timerLine = $("#timer-line");
var scoresList = $("#scores-list");
var vanillaScoresList = document.getElementById('scores-list');


// SET INITIAL VALUES FOR TOP OF GAME
var kittenCounter = 0;
var imgIndex = 0

var kittenList = [
    {
        url: "https://placekitten.com/205/200",
        desc: "look at this cutie!"
    },
    {
        url: "https://placekitten.com/198/200",
        desc: "here's another one!"
    },
    {
        url: "https://placekitten.com/200/200",
        desc: "lookit the face here!"
    },
    {
        url: "https://placekitten.com/250/200",
        desc: "o mah gaw!"
    },
    {
        url: "https://placekitten.com/300/200",
        desc: "so fuzzzzzzyyyyyeeeeee!"
    },
]


// get local storage if exists SET TO EMPTY ARRAY IF NOT
var storedScores = JSON.parse(localStorage.getItem('scores')) || [];
console.log(storedScores);

// RENDER CURRENT SCORE LIST ON PAGE
init();

// INITIAL PAGE SETUP - HIDE TIMER, SHOW FIRST KITTEN INFO
function init(){
    timerLine.css('display', 'none')
    kittenPic.attr('src', kittenList[imgIndex].url);
    kittenDesc.text(kittenList[imgIndex].desc)
    clickBtn.css('display', 'none')
    renderScores();
}
// RENDER SCORES (FROM LOCALSTORAGE) ONTO PAGE
function renderScores() {
    // scoresList.empty()
vanillaScoresList.innerHTML = '';
    // while(scoresList.firstChild) ul.removeChild(ul.firstChild);
    storedScores.forEach(function (score) {
        var newLi = document.createElement('li');
        newLi.textContent = `${score.userInits} -- ${score.userScore}`
        scoresList.append(newLi)
    })
}

// GAME BUTTON - COUNT CLICKS AND INCREMENT DISPLAY
clickBtn.on('click', function () {
    // INCREMENT SCORE COUNTER
    kittenCounter++;

    // IF ON LAST ARRAY ITEM, RESET TO START OF ARRAY
    if (imgIndex === kittenList.length-1) {
        imgIndex = 0;
    }

    // INCREMENT ARRAY INDEX
    imgIndex++;

    // UPDATE HTML WITH NEXT ARRAY ITEM INFO
    kittenPic.attr('src', kittenList[imgIndex].url)
    kittenDesc.text(kittenList[imgIndex].desc)
})


// START GAME - DISPLAY TIMER AND GAME BUTTON
startBtn.on('click', function () {
    // SHOW GAME BUTTON
    clickBtn.css('display', 'inline')

    // RESET SCORE COUNTER
    kittenCounter = 0;      
    // HIDE START BUTTON, SHOW CLICKER BUTTON
    startBtn.css('display', 'none')
    timerLine.css('display', 'block');

    // INITIALIZE TIMER VALUE AND UPDATE DISPLAY
    var timer = 5;
    timerTxt.text(timer)

    // GAME TIMER INTERVAL
    var gameTimer = setInterval(() => {          
        timer--;
        // DISPLAY CURRENT TIME REMAINING
        timerTxt.text(timer)

        // TIMER RUNS OUT
        if (timer === 0) {
            clearInterval(gameTimer);
            // HIDE TIMER
            timerLine.css('display', 'none')

            // ALERT USER OF SCORE
            alert("Congrats! You saw " + kittenCounter + " kittens!")
            // SHOW THE START BUTTON
            startBtn.css('display', 'inline');
            // RUN ENDGAME FUNCTION
            endGame();
        }
    }, 1000);
})


function endGame() {
    // GET USER INFO
    var userInits = prompt("Please enter your initials: ")
    // SAVE USER INFO WITH SCORE
    var userObj = { userInits: userInits, userScore: kittenCounter }

    // PUSH USER INFO/SCORE TO SCORES LIST (FROM LOCALSTORAGE)
    storedScores.push(userObj);

    // SAVE UPDATED SCORES LIST TO LOCALSTORAGE
    localStorage.setItem('scores', JSON.stringify(storedScores))

    // RE-INITIALIZE PAGE WITH UPDATED SCORES
    init();

}