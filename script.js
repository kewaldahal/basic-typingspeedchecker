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
        document.getElementById('result').textContent = `Your typing speed: 0 CPM (0 WPM)`;
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
    let userCharacters = userText.replace(/\s/g, ''); // Remove white spaces
    let textCharacters = document.getElementById('text-to-type').textContent.replace(/\s/g, ''); // Remove white spaces

    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); // in minutes, maximum 20 minutes
    let cpm = Math.round(userCharacters.length / timeElapsed);
    return cpm;
}



function calculateWPM(userText) {
    let userWords = userText.trim().split(/\s+/);
    let timeElapsed = Math.min((Date.now() - startTime) / 1000 / 60, 20); // in minutes, maximum 20 minutes
    let wpm = Math.round(userWords.length / timeElapsed);
    return wpm;
}

function resetPage() {
    clearInterval(timer);
    isTyping = false;
    charCount = 0;
    document.getElementById('user-input').value = '';
    document.getElementById('timer').textContent = '20';
    document.getElementById('result').textContent = `Your typing speed: 0 CPM (0 WPM)`;
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    let randomSentence = sentences[currentSentenceIndex];
    document.getElementById('text-to-type').textContent = randomSentence;
}


document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && isTyping) {
        finishTyping();
    }
});
