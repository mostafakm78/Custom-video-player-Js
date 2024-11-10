let playArea = document.querySelector('.video-player');
let media = playArea.querySelector('.video');
let controls = playArea.querySelector('.my-player-control');
let play = controls.querySelector('.play');
let frwd = controls.querySelector('.forward');
let rwnd = controls.querySelector('.rewind');
let timer = controls.querySelector('.timer');
let currentTime = timer.querySelector('.currentTime');
let videoTime = timer.querySelector('.videoTime');
let timebar = playArea.querySelector('.control-prgsbar-current');
let volume = playArea.querySelector('.volume i');
let volumebar = playArea.querySelector('.volume-progress');
let volumebarinput = playArea.querySelector('.volume-progress input');
let fullscreen = playArea.querySelector('.fullscreen');

media.volume = 1;

media.addEventListener('click' , function() {
    if (media.paused) {
        toggleicon()
        media.play()
    } else {
        toggleicon()
        media.pause()
    }
})

media.addEventListener('timeupdate' , function() {
    currentTime.textContent = toggletime(media.currentTime);
    let timelength = (media.currentTime / media.duration) * 100;
    timebar.style = `background: linear-gradient(90deg, rgba(58,34,230,1) ${timelength}%, #e1e1e1 0%)`;
    timebar.value = timelength;
})

timebar.addEventListener('input' , function() {
    media.currentTime = (this.value / 100) * media.duration;
})

play.addEventListener('click' , function() {
    videoTime.textContent = toggletime(media.duration);
    if (media.paused) {
        toggleicon()
        media.play()
    } else {
        toggleicon()
        media.pause()
    }
})

rwnd.addEventListener('click' , function() {
    media.currentTime = media.currentTime - 10;
})

frwd.addEventListener('click' , function() {
    media.currentTime = media.currentTime + 10;
})

volume.addEventListener('click' , function() {
    volumebar.classList.toggle('active');
})

volumebarinput.addEventListener('input' , function() {
    media.volume = this.value / 100;
    this.value.style = `background: linear-gradient(90deg, rgba(58,34,230,1) ${this.value}%, #e1e1e1 0%)`
})

fullscreen.addEventListener('click' , function() {
        media.classList.add('active')
        media.classList.remove('video')
        if (!document.fullscreenElement) {
          playArea.requestFullscreen();
        } else if (document.exitFullscreen) {
            media.classList.add('video')
          document.exitFullscreen();
        }
})

function toggleicon() {
    let icon = play.querySelector('i')
    icon.classList.toggle('fa-pause');
    icon.classList.toggle('fa-play');
}

function toggletime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - (min * 60));
    let minvalue;
    let secvalue;
    if (min < 10) {
        minvalue = '0' + min;
    } else {
        minvalue = min;
    }
    if (sec < 10) {
        secvalue = '0' + sec;
    } else {
        secvalue = sec;
    }
    return minvalue + ':' + secvalue;
}
