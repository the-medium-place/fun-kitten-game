var picBox = $('#pic-box');
var kittenPic = $("#kitten-pic");
var startBtn = $("#start-btn");
var clickBtn = $("#click-btn");
var kittenDesc = $("#kitten-desc");
var timerTxt = $("#timer-txt");
var timerLine = $("#timer-line");
var scoresList = $("#scores-list");

var kittenCounter = 0;
var imgIndex = 0

var kittenList = [
    {
        url: "https://placekitten.com/200/200",
        desc: "look at this cutie!"
    },
    {
        url: "https://placekitten.com/205/198",
        desc: "here's another one!"
    },  
    {
        url: "https://placekitten.com/203/220",
        desc: "lookit the face here!"
    },  
    {
        url: "https://placekitten.com/200/185",
        desc: "o mah gaw!"
    },  
    {
        url: "https://placekitten.com/195/215",
        desc: "so fuzzzzzzyyyyyeeeeee!"
    },
]

var storedScores = localStorage.getItem('scores');

if(storedScores){
    storedScores = JSON.parse(storedScores);
} else {
    storedScores = []
}

storedScores.forEach(score => {
    scoresList.append(`<li> ${score.userInits} -- ${score.userScore}`)
})



timerLine.css('display', 'none')
kittenPic.attr('src', kittenList[imgIndex].url);
kittenDesc.text(kittenList[imgIndex].desc)


clickBtn.on('click', function (){
    kittenCounter++;
    if(imgIndex === kittenList.length){
        imgIndex= 0;
    }
    imgIndex++;

    kittenPic.attr('src', kittenList[imgIndex].url)
    kittenDesc.text(kittenList[imgIndex].desc)
})

startBtn.on('click', function(){
    kittenCounter = 0;
    startBtn.css('display', 'none')
    timerLine.css('display', 'block');
    var timer = 5;
    timerTxt.text(timer)

    var gameTimer = setInterval(() => {
        timer--;

        timerTxt.text(timer)

        if(timer === 0){
            clearInterval(gameTimer);
            timerLine.css('display', 'none')

            alert(`Congrats! You saw ${kittenCounter} kittens!`)
            startBtn.css('display', 'inline');
            endGame();

        }


    }, 1000);
})


function endGame(){
    var userInits = prompt("Please enter you initials: ")
    var userObj = {
        userInits: userInits,
        userScore: kittenCounter
    }

    storedScores.push(userObj);

    // JSON.stringify(currentScore);

    localStorage.setItem('scores', JSON.stringify(storedScores))

    

    


}