document.addEventListener('DOMContentLoaded', () => {
    const enterText = document.getElementById('enterText');
    const message = document.getElementById('message');
    const wordElement = document.getElementById('word');
    let currentWord = '';

    const correctSound = new Audio('https://thumbs.dreamstime.com/audiothumb_13752/137523215.mp3');
    correctSound.playbackRate = 1.5;
    correctSound.volume = 0.3;

    let lang = document.querySelector('input[name="lang"]:checked').value;
    let currentWordList;
    let soundEnabled = document.getElementById('optionPlaySound').checked;
    let caseSensitive = document.getElementById('optionPlaySound').checked;

    function newWord() {
        const newWord = currentWordList[Math.floor(Math.random() * currentWordList.length)];
        currentWord = newWord;
        wordElement.textContent = newWord;
    }

    enterText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.ctrlKey) {
                newWord();
                e.target.value = '';
                message.textContent = '\u00A0';
            } else {
                validate(e);
            }
        }
    });

    function validate(e) {
        let inputText = e.target.value.trim();
        if (!caseSensitive) inputText = inputText.toLowerCase();

        if (inputText === currentWord) {
            message.textContent = '\u00A0';
            correctSound.currentTime = 0.01;
            soundEnabled && correctSound.play();
            e.target.value = '';
            newWord();
        } else {
            message.textContent = 'Incorrect';
        }
    }

    document.getElementById('optionPlaySound').addEventListener('change', (e) => {
        soundEnabled = e.target.checked;
    });

    document.getElementById('optionCaseSensitive').addEventListener('change', (e) => {
        caseSensitive = e.target.checked;
    });

    document.getElementById('languageForm').addEventListener('change', initialize);

    function initialize() {
        lang = document.querySelector('input[name="lang"]:checked').value;
        currentWordList = words[lang];
        newWord();
    }

    initialize();
});