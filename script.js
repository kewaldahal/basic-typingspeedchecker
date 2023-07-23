let timer;
let startTime;
let textToType = "The quick brown fox jumps over the lazy dog.";
let isTyping = false;
let charCount = 0;

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        charCount = 0;
        document.getElementById('user-input').value = '';
        startTime = Date.now();
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    let currentTime = Math.floor((Date.now() - startTime) / 1000);
    let remainingTime = 20 - currentTime;

    if (remainingTime >= 0) {
        document.getElementById('timer').textContent = remainingTime;
    } else {
        finishTyping();
    }
}

function finishTyping() {
    clearInterval(timer);
    isTyping = false;
    let userText = document.getElementById('user-input').value;
    let userCPM = calculateCPM(userText);
    let userWPM = calculateWPM(userText);

    document.getElementById('result').textContent = `Your typing speed: ${userCPM} CPM (${userWPM} WPM)`;
}

function calculateCPM(userText) {
    let userWords = userText.trim().split(/\s+/);
    let textWords = textToType.trim().split(/\s+/);

    for (let i = 0; i < Math.min(userWords.length, textWords.length); i++) {
        if (userWords[i] === textWords[i]) {
            charCount += userWords[i].length + 1; // Add 1 for the space after the word
        } else {
            break;
        }
    }

    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); // in minutes, maximum 20 minutes
    let cpm = Math.round(charCount / timeElapsed);
    return cpm;
}

function calculateWPM(userText) {
    let userWords = userText.trim().split(/\s+/);
    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); // in minutes, maximum 20 minutes
    let wpm = Math.round(userWords.length / timeElapsed);
    return wpm;
}

// Listen for "Enter" key press
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        finishTyping();
    }
});
