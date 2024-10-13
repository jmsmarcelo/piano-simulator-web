const keys = ['a', 'w', 's', 'e', 'd', 'r', 'f', 't', 'g', 'u', 'j', 'i', 'k', 'o', 'l', 'p', 'ç'];
const keyboard = document.querySelector('.piano-keys');
let pianoKeys = {};
const audios = [];
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');
const playTune = (i) => {
    if(!audios[i]) audios[i] = new Audio(`src/tunes/${i}.wav`);
    audios[i].volume = volumeSlider.value;
    audios[i].currentTime = 0;
    audios[i].play();
    pianoKeys[keys[i]].classList.add('active');
    setTimeout(() => {
        pianoKeys[keys[i]].classList.remove('active');
    }, 150);
};
const showHideKeys = () => {
    for(const k in pianoKeys) {
        pianoKeys[k].firstChild.classList.toggle('hide');
    }
};
keysCheck.addEventListener('click', showHideKeys);
const init = () => {
    while(keyboard.firstChild) {
        keyboard.firstChild.remove();
    }
    pianoKeys = {};
    for(let i = 0; i < keys.length; i++) {
        let k = document.createElement('li');
        let text = document.createElement('span');
        text.textContent = keys[i];
        k.addEventListener('click', () => playTune(i));
        k.classList.add('key');
        k.classList.add((i % 2 === 0 ? 'white' : 'black'));
        k.appendChild(text);
        keyboard.appendChild(k);
        pianoKeys[keys[i]] = k;
    }
};
document.addEventListener('keydown', (e) => {
    if(pianoKeys[e.key]) {
        playTune(keys.indexOf(e.key));
    }
});
init();