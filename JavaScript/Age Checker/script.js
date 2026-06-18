//if else
document.getElementById("check").addEventListener("click", function () {

    const ageValue = parseInt(document.getElementById("age").value);
    console.log(ageValue);

    const resultEL = document.getElementById("result");
    resultEL.innerHTML = "";

    if (isNaN(ageValue) || ageValue < 0) {
        resultEL.innerHTML = "Please enter a valid age";
        return;
    }


    if (ageValue >= 18) {
        resultEL.innerHTML += "you are eligible to vote  <br/>"
    } else {
        resultEL.innerHTML += "you are not eligible to vote <br/>"
    }

    if (ageValue >= 21) {
        resultEL.innerHTML += "you are eligible to drink alcohol <br/>"
    } else {
        resultEL.innerHTML += "you are not eligible to drink alcohol <br/>"

    }

    if (ageValue >= 16) {
        resultEL.innerHTML += "you are eligible to drive <br/>"
    } else {
        resultEL.innerHTML += "you are not eligible to drive <br/>"

    }

});

//switch
document.getElementById("sound").addEventListener("click", function () {
    const soundValue = document.getElementById("music").value;
    console.log(soundValue);


    const ansEL = document.getElementById("results");
    ansEL.innerHTML = "";

    switch (soundValue) {
        case 'dog':
            ansEL.textContent = "bhow bhow";
            break;

        case 'cat':
            ansEL.textContent = "meow meow";
            break;

        default:
            ansEL.textContent = "sorry! I don't want animal sound"
    }
})

//Countdown Timer

const startCountDown = () => {
    const timerInput = document.getElementById("timerInput").value;
    const timerDisplay = document.getElementById("timer");
    const timeRemaining = parseInt(timerInput);

    if (isNaN(timeRemaining) || timeRemaining <= 0) {
        timerDisplay.textContent = "Please enter a valid number"
        return;

    }


    timerDisplay.textContent = `Time Left ${timeRemaining} seconds`;
    for (let i = timeRemaining; i >= 0; i--) {
        (function (count) {
            setTimeout(() => {
                if (count > 0) {
                    timerDisplay.textContent = `Time Left ${count} seconds`
                } else {
                    timerDisplay.textContent = "Times Up!"
                }
            }, (timeRemaining - count) * 1000)

        })(i)
    }
};

document.getElementById("startBtn").addEventListener("click", startCountDown);

//Temperature converter
document.getElementById("convert").addEventListener("click", function () {
    const temperature = parseInt(document.getElementById("inputTemp").value);
    const conversionType = document.getElementById("conversiontype").value;
    const resultDiv = document.getElementById("answer");

    resultDiv.textContent = "";

    if (isNaN(temperature)) {
        resultDiv.textContent = "Please enter valid number";
        return;
    }

    let convertedTemperature;
    if (conversionType == "toCelsius") {
        const convertedTemperature = (temperature - 32) * (5 / 9);
        resultDiv.textContent = `${temperature} F converted to ${convertedTemperature.toFixed(2)} C`
    } else if (conversionType == "toFahrenit") {
        const convertedTemperature = temperature * (9 / 5) + 32;

        resultDiv.textContent = `${temperature} C converted to ${convertedTemperature.toFixed(2)} F`
    }

})

//Number Guessing Game

const randomNumber = Math.floor(Math.random() * 10) + 1;
let userGuess;

console.log(randomNumber);

const feedback = document.getElementById("feedback");

feedback.textContent =
    "Please enter a number between 1 and 10";

document.getElementById("guess")
    .addEventListener("click", function () {

        userGuess = parseInt(
            document.getElementById("guessInput").value
        );

        // Validate user input
        if (isNaN(userGuess) || userGuess <= 0) {
            feedback.textContent =
                "Please enter a valid number";
            return;
        }

        guessCheck();
    });

function guessCheck() {

    if (userGuess === randomNumber) {
        feedback.textContent =
            " Correct Guess!";
    } else {
        feedback.textContent =
            " Wrong Guess. Try Again!";
    }
}

