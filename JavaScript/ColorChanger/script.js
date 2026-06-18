const btn1El = document.querySelector(".btn1");
const btn2El = document.querySelector(".btn2");
const resetEl = document.querySelector(".reset");
const bodyEl = document.querySelector("body");

const audio = new Audio("carnival.mp3");

btn1El.addEventListener("click", function () {
    bodyEl.style.backgroundColor = "pink";
});

btn2El.addEventListener("click", function () {
    bodyEl.style.fontSize = "25px";
});

document.getElementById("sound").addEventListener("click", function () {
    audio.play();
});

resetEl.addEventListener("click", function () {
    bodyEl.style.backgroundColor = "";
    bodyEl.style.fontSize = "";

    audio.pause();
});