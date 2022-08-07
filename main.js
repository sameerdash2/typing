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

    function newWord() {
        currentWord = currentWordList[Math.floor(Math.random() * currentWordList.length)];
        wordElement.textContent = currentWord;
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
        if (!options.caseSensitive) inputText = inputText.toLowerCase();

        if (inputText === currentWord) {
            message.textContent = '\u00A0';
            correctSound.currentTime = 0.01;
            options.playSound && correctSound.play();
            e.target.value = '';
            newWord();
        } else {
            message.textContent = 'Incorrect';
        }
    }

    const options = {};

    function updateOptionsFromDOM() {
        options.playSound = document.getElementById('option_playSound').checked;
        options.caseSensitive = document.getElementById('option_caseSensitive').checked;

        populateStorage();
    }

    function populateStorage() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('playSound', options.playSound);
            localStorage.setItem('caseSensitive', options.caseSensitive);
        }
    }

    function loadFromStorage() {
        if (typeof localStorage !== 'undefined') {
            document.getElementById('option_playSound').checked = undefinedOrTrue(localStorage.getItem('playSound'));
            document.getElementById('option_caseSensitive').checked = undefinedOrTrue(localStorage.getItem('caseSensitive'));
        }
        updateOptionsFromDOM();
    }

    document.getElementById('optionsForm').addEventListener('change', updateOptionsFromDOM);

    document.getElementById('languageForm').addEventListener('change', initialize);

    function initialize() {
        lang = document.querySelector('input[name="lang"]:checked').value;
        currentWordList = words[lang];
        newWord();
    }

    loadFromStorage();
    initialize();
});

function undefinedOrTrue(x) {
    // localStorage only stores strings
    return typeof x !== 'string' || x === 'true';
}
