let timer;
let startTime;
let sentences = [
    "Please take your dog, Cali, out for a walk – he really needs some exercise!",
    "What a beautiful day it is on the beach, here in beautiful and sunny Hawaii.",
    "Rex Quinfrey, a renowned scientist, created plans for an invisibility machine.",
    "Do you know why all those chemicals are so hazardous to the environment?",
    "You never did tell me how many copper pennies where in that jar; how come?",
    "Max Joykner sneakily drove his car around every corner looking for his dog.",
    "The two boys collected twigs outside, for over an hour, in the freezing cold!",
    "When do you think they will get back from their adventure in Cairo, Egypt?",
    "Trixie and Veronica, our two cats, just love to play with their pink ball of yarn.",
    "The quick brown fox jumps over the lazy dog",
    "We climbed to the top of the mountain in just under two hours; isn’t that great?"
];
let currentSentenceIndex = 0;
let isTyping = false;
let charCount = 0;

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        charCount = 0;
        document.getElementById('user-input').value = '';
        let randomSentence = getRandomSentence();
        document.getElementById('text-to-type').textContent = randomSentence;
        document.getElementById('result').textContent = `Your typing speed: 0 CPM (0 WPM) | Accuracy: 100%`;
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
    let accuracy = calculateAccuracy(userText);

    document.getElementById('result').textContent = `Your typing speed: ${userCPM} CPM (${userWPM} WPM) | Accuracy: ${accuracy}%`;

  
    let emojiIcon = document.getElementById('emojiIcon');
    if (userWPM >= 40) {
        emojiIcon.textContent = '😃'; 
    } else if (userWPM >= 20) {
        emojiIcon.textContent = '😐'; 
    } else {
        emojiIcon.textContent = '🙁'; 
    }

    highlightIncorrectWords(userText);
}

function calculateCPM(userText) {
    let userCharacters = userText.replace(/\s/g, ''); 
    let textCharacters = document.getElementById('text-to-type').textContent.replace(/\s/g, '');

    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); 
    let cpm = Math.round(userCharacters.length / timeElapsed);
    return cpm;
}

function calculateWPM(userText) {
    let userWords = userText.trim().split(/\s+/);
    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); 
    let wpm = Math.round(userWords.length / timeElapsed);
    return wpm;
}

function calculateAccuracy(userText) {
    let userWords = userText.trim().split(/\s+/);
    let textWords = document.getElementById('text-to-type').textContent.trim().split(/\s+/);

    let incorrectWordsCount = 0;

    for (let i = 0; i < Math.min(userWords.length, textWords.length); i++) {
        if (userWords[i] !== textWords[i]) {
            incorrectWordsCount++;
        }
    }

    for (let i = userWords.length; i < textWords.length; i++) {
        incorrectWordsCount++;
    }

    let totalWords = textWords.length;
    let correctWords = totalWords - incorrectWordsCount;
    let accuracy = (correctWords / totalWords) * 100;
    return accuracy.toFixed(2);
}

function highlightIncorrectWords(userText) {
    let userWords = userText.trim().split(/\s+/);
    let textWords = document.getElementById('text-to-type').textContent.trim().split(/\s+/);

    let incorrectWordsCount = 0;
    let highlightedText = "";

    for (let i = 0; i < Math.min(userWords.length, textWords.length); i++) {
        if (userWords[i] !== textWords[i]) {
            highlightedText += `<span class="incorrect-word">${userWords[i]}</span> `;
            incorrectWordsCount++;
        } else {
            highlightedText += userWords[i] + " ";
        }
    }

    for (let i = userWords.length; i < textWords.length; i++) {
        highlightedText += `<span class="missing-word">${textWords[i]}</span> `;
        incorrectWordsCount++;
    }

    document.getElementById('text-to-type').innerHTML = highlightedText;
}

function resetPage() {
    clearInterval(timer);
    isTyping = false;
    charCount = 0;
    document.getElementById('user-input').value = '';
    document.getElementById('timer').textContent = '20';
    document.getElementById('result').textContent = `Your typing speed: 0 CPM (0 WPM) | Accuracy: 100%`;
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    let randomSentence = sentences[currentSentenceIndex];
    document.getElementById('text-to-type').textContent = randomSentence;
    document.getElementById('emojiIcon').innerHTML = '';
}

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && isTyping) {
        finishTyping();
    }
});
