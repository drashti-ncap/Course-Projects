document.addEventListener("DOMContentLoaded", () => {
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");

  const sampleTexts = [
    "Practice makes typing faster and more accurate.",
    "Keep your eyes on the screen and let your fingers move.",
    "Small daily habits can create surprisingly strong results.",
    "Clear thoughts become easier to share with steady typing.",
    "Focus on accuracy first, then build your speed naturally.",
  ];

  let currentText = "";
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;
  let resetTimer = null;

  function initializeGame() {
    clearTimeout(resetTimer);
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    typingInputElement.value = "";
    typingInputElement.disabled = false;
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    renderText();
    updateFeedback();
  }

  function renderText() {
    const typedText = typingInputElement.value;
    const words = currentText.match(/\S+\s*/g) || [];
    let characterPosition = 0;

    textToTypeElement.innerHTML = "";

    words.forEach((word) => {
      const wordElement = document.createElement("span");
      const wordStart = characterPosition;
      const wordEnd = wordStart + word.length;
      const typedWord = typedText.slice(wordStart, Math.min(wordEnd, typedText.length));
      const targetWord = currentText.slice(wordStart, Math.min(wordEnd, typedText.length));

      wordElement.classList.add("word");

      if (typedText.length >= wordEnd) {
        wordElement.classList.add(typedWord === word ? "completed" : "has-error");
      } else if (typedText.length >= wordStart && typedText.length < wordEnd) {
        wordElement.classList.add("current-word");
      } else {
        wordElement.classList.add("upcoming");
      }

      Array.from(word).forEach((character, index) => {
        const absoluteIndex = wordStart + index;
        const characterElement = document.createElement("span");
        characterElement.textContent = character;

        if (absoluteIndex < typedText.length) {
          characterElement.className =
            typedText[absoluteIndex] === character ? "correct" : "incorrect";
        } else if (absoluteIndex === typedText.length) {
          characterElement.className = "current-character";
        }

        wordElement.appendChild(characterElement);
      });

      if (typedWord !== targetWord) {
        wordElement.classList.add("has-error");
      }

      textToTypeElement.appendChild(wordElement);
      characterPosition = wordEnd;
    });
  }

  function getPerformance() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    const completedCharacters = typingInputElement.value.trim().length;
    const wordsTyped = completedCharacters / 5;
    const speed = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;

    return { speed, accuracy };
  }

  function updateFeedback() {
    const { speed, accuracy } = getPerformance();

    speedElement.textContent = speed;
    accuracyElement.textContent = accuracy;
  }

  function updateProgress() {
    const typedText = typingInputElement.value;
    currentIndex = Math.min(typedText.length, currentText.length);
    errors = 0;

    for (let i = 0; i < currentIndex; i++) {
      if (typedText[i] !== currentText[i]) {
        errors++;
      }
    }
  }

  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;

    setTimeout(() => {
      messageArea.textContent = "";
    }, 3000);
  }

  typingInputElement.addEventListener("input", () => {
    const typedText = typingInputElement.value;

    if (typedText.length > currentText.length) {
      typingInputElement.value = typedText.slice(0, currentText.length);
    }

    updateProgress();
    renderText();
    updateFeedback();

    if (typingInputElement.value === currentText) {
      const { speed, accuracy } = getPerformance();
      typingInputElement.disabled = true;
      displayMessage(`Completed! Speed: ${speed} WPM | Accuracy: ${accuracy}%.`);
      resetTimer = setTimeout(initializeGame, 3000);
    }
  });

  initializeGame();
});
