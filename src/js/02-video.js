import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const vimeoPlayer = new Player(iframe);

const saveCurrentTime = currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const loadAndSetCurrentTime = async () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    await vimeoPlayer.setCurrentTime(parseFloat(currentTime));
  }
};

vimeoPlayer.on(
  'timeupdate',
  throttle(event => {
    const currentTime = event.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);

window.addEventListener('load', loadAndSetCurrentTime);
