let hScore = 0;
let gScore = 0;

let hScoreEl = document.getElementById('h-score');
let gScoreEl = document.getElementById('g-score');

let hOneEl = document.getElementById('h-one');
let hTwoEl = document.getElementById('h-two');
let hThreeEl = document.getElementById('h-three');

let gOneEl = document.getElementById('g-one');
let gTwoEl = document.getElementById('g-two');
let gThreeEl = document.getElementById('g-three');

let startGameEl = document.getElementById('sg-id');
let newGameEl = document.getElementById('ng-id');
let mainEl = document.getElementById('main');

let gameOverEl = document.getElementById('game-over');

// home board events
hOneEl.addEventListener('click', (e) => {
    increment(hScoreEl, 1);
});

hTwoEl.addEventListener('click', () => {
    increment(hScoreEl, 2);
});

hThreeEl.addEventListener('click', () => {
    increment(hScoreEl, 3);
});

// guest board events
gOneEl.addEventListener('click', () => {
    increment(gScoreEl, 1);
});

gTwoEl.addEventListener('click', () => {
    increment(gScoreEl, 2);
});

gThreeEl.addEventListener('click', () => {
    increment(gScoreEl, 3);
});

startGameEl.addEventListener('click', startPauseGame);

hScoreEl.textContent = hScore;
gScoreEl.textContent = gScore;

function increment(scoreEl, value) {
    let pausedMainEl = scoreEl.closest('div.paused');
    let overMainEl = scoreEl.closest('div.over');

    if (!pausedMainEl && !overMainEl) {
        if (scoreEl.id == 'h-score') {
            hScore += value;
            scoreEl.textContent = hScore;
        } else {
            gScore += value;
            scoreEl.textContent = gScore;
        }

        highlightLeader();
    }
}

function highlightLeader() {
    clearHighlight();

    if (hScore > gScore) {
        hScoreEl.classList.add('highlight');
    } else if (hScore < gScore) {
        gScoreEl.classList.add('highlight');
    }
}

function clearHighlight() {
    hScoreEl.classList.remove('highlight');
    gScoreEl.classList.remove('highlight');
}

function startPauseGame() {
    if (startGameEl.classList.contains('paused')) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function resumeGame() {
    startGameEl.textContent = 'Pause Game';
    startGameEl.classList.remove('paused');
    mainEl.classList.remove('paused');
    resumeTimer();
}

function pauseGame() {
    startGameEl.textContent = 'Resume Game';
    startGameEl.classList.add('paused');
    mainEl.classList.add('paused');
    pauseTimer();
}

function gameOver() {
    pauseTimer();
    startGameEl.textContent = 'Start Game';
    mainEl.classList.add('over');
    gameOverEl.classList.remove('hidden');
    startGameEl.classList.add('hidden');
}

function resetGame() {
    clearHighlight();

    hScore = 0;
    gScore = 0;
    hScoreEl.textContent = hScore;
    gScoreEl.textContent = gScore;

    resetTimer();
    mainEl.classList.add('paused');
    mainEl.classList.remove('over');
    startGameEl.textContent = 'Start Game';
    startGameEl.classList.add('paused');
    startGameEl.classList.remove('hidden');
}

let timerEl = document.getElementById('timer');
let timeLimitEl = document.getElementById('time-limit');
let time = '00:00:00';
let totalSeconds = 0;

const timeLimit = 1800; // max 86400

function setTimeLimit() {
    let seconds = pad(timeLimit % 60);
    let minutes = pad(Math.floor((timeLimit % 3600) / 60));
    let hours = pad(Math.floor(timeLimit / 3600));

    time = `${hours}:${minutes}:${seconds}`;
    timeLimitEl.textContent = time;
}

setTimeLimit();

let interval = null;
function resumeTimer() {
    interval = setInterval(() => {
        ++totalSeconds;
        let seconds = pad(totalSeconds % 60);
        let minutes = pad(Math.floor((totalSeconds % 3600) / 60));
        let hours = pad(Math.floor(totalSeconds / 3600));

        time = `${hours}:${minutes}:${seconds}`;
        timerEl.textContent = time;

        if (totalSeconds >= timeLimit) {
            gameOver();            
        }
    }, 1000);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

newGameEl.addEventListener('click', (e) => {
    e.preventDefault();
    let text = "Are you sure you want to start a new game?\nAll information will be lost!\n Either OK or Cancel.";

    if (interval !== null) {
        if (confirm(text) === true) {
            resetGame();
        }
    }
});

function pauseTimer() {
    clearInterval(interval);
}

function resetTimer() {
    totalSeconds = 0;
    time = '00:00:00';
    clearInterval(interval);
    interval = null;
    timerEl.textContent = time;
}