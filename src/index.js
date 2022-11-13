

import generateJoke from "./generateJoke";
import './sass/main.scss';

// for the image that you want to use with...) START
import laughingImage from './assets/images/laughing.svg';
const laughImg = document.querySelector('#laughImg');
laughImg.src = laughingImage;
//END FOT IMAGE

//BTN START
const jokeBtn = document.querySelector('#jokeBtn');
jokeBtn.addEventListener('click', generateJoke);
//BTN END

generateJoke();
