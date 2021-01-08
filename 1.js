const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//Song title
const songs = ['Chang The Tim Duoc Em - PhucXP_ Freak D','Hom Nay Em Cuoi Roi Lo-fi_ - Khai Dang_','Vai Giay Nua Thoi - Reddy'];

//Keep track of song
let songIndex = 0;

//Load song details into DOM
loadSong(songs[songIndex]);

//Update Song
function loadSong(song) {
	title.innerText = song;
	audio.src = `mp3/${song}.mp3`;
	cover.src = `img/${song}.jpg`; 
}

//Event Listen
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	}else {
		playSong();
	}
});

//Play Song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

//Pause Song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause();
}

//Prev Song
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//Next Song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//update Progress
function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

//set Progress
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX/width) * duration;
}

//Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//TimeSong update 
audio.addEventListener('timeupdate', updateProgress);

//Click on Progress song
progressContainer.addEventListener("click", setProgress);

//Song Ends
audio.addEventListener('ended', nextSong);
