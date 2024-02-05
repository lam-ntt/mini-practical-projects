let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0
}

renderScore();

let autoPlaying = false, intervalId;

document.querySelector(".js-rock-button").addEventListener("click", () => {
    playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
    playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
    playGame("scissors");
});

document.querySelector(".js-reset-button").addEventListener("click", () => {
    document.querySelector(".js-confirm-button").innerHTML = `
        Are you sure you want to reset the score? 
        <button class="js-y-confirm-button confirm-button">Yes</button>
        <button class="js-n-confirm-button confirm-button">No</button>
    `;

    document.querySelector(".js-y-confirm-button").addEventListener("click", () => {
        score = {
            wins: 0,
            loses: 0,
            ties: 0
        }
        localStorage.removeItem("score");
        renderScore();

        document.querySelector(".js-confirm-button").innerHTML = "";
    });

    document.querySelector(".js-n-confirm-button").addEventListener("click", () => {
        document.querySelector(".js-confirm-button").innerHTML = "";
    });
});

document.querySelector(".js-auto-button").addEventListener("click", () => {
    if(autoPlaying === false){
        intervalId = setInterval(() => {
            playGame(randomPick());
        }, 1000);
        document.querySelector(".js-auto-button").innerHTML = "Stop Playing";
        autoPlaying = true;
    }else{
        clearInterval(intervalId);
        document.querySelector(".js-auto-button").innerHTML = "Auto Play";
        autoPlaying = false;
    }
});

function renderScore(){
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}. Loses: ${score.loses}. Ties: ${score.ties}`;
}

function convertToImage(pick){
    if(pick === "rock"){
        return "rock-emoji.png";
    }else if(pick === "paper"){
        return "paper-emoji.png";
    }else{
        return "scissors-emoji.png";
    }
}

function randomPick(){
    randomNumber = Math.random();
    if(randomNumber <= 1/3){
        return "rock";
    }else if(randomPick <= 2/3){
        return "paper";
    }else{
        return "scissors";
    }
}

function playGame(playerPick){
    computerPick = randomPick();
    let state;
    if(computerPick === "rock"){
        if(playerPick === "rock"){
            state = "One-all.";
            score.ties++;
        }else if(playerPick === "paper"){
            state = "Lose.";
            score.loses++;
        }else{
            state = "Win.";
            score.wins++;
        }
    }else if(computerPick === "paper"){
        if(playerPick === "rock"){
            state = "Win.";
            score.wins++;
        }else if(playerPick === "paper"){
            state = "One-all.";
            score.ties++;
        }else{
            state = "Lose.";
            score.loses++;
        }
    }else{
        if(playerPick === "rock"){
            state = "Lose.";
            score.loses++;
        }else if(playerPick === "paper"){
            state = "Win.";
            score.wins++;
        }else{
            state = "One-all.";
            score.ties++;
        }
    }

    document.querySelector(".js-state").innerHTML = state;
    document.querySelector(".js-picks").innerHTML = `
    You <img src="images/${convertToImage(playerPick)}"> <img src="images/${convertToImage(computerPick)}"> Computer
    `;

    renderScore();

    localStorage.setItem("score", JSON.stringify(score));
}