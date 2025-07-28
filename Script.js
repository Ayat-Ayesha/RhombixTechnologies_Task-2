// Music library with album images
const musicLibrary = [
  { title: "Calm Music", src: "mp3/mp1.mp3", category: "pop", img: "image/Album.1.png" },
  { title: "Motivation", src: "mp3/mp3.mp3", category: "rock", img: "image/Album.3.png" },
  { title: "Cool", src: "mp3/mp2.mp3", category: "jazz", img: "image/Album.2.png" }
];

let currentIndex = 0;
let filteredList = [...musicLibrary];

const playlistEl = document.getElementById("playlist");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const audio = document.getElementById("audio");
const albumArt = document.getElementById("album-art");

// Controls
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volumeSlider = document.getElementById("volume");

function renderPlaylist() {
  playlistEl.innerHTML = "";
  filteredList.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => loadSong(index));
    playlistEl.appendChild(li);
  });
}

function loadSong(index) {
  currentIndex = index;
  const song = filteredList[currentIndex];
  audio.src = song.src;
  albumArt.src = song.img; // Change album art
  audio.play();
}

searchEl.addEventListener("input", filterSongs);
categoryEl.addEventListener("change", filterSongs);

function filterSongs() {
  const searchTerm = searchEl.value.toLowerCase();
  const category = categoryEl.value;
  filteredList = musicLibrary.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || song.category === category;
    return matchesSearch && matchesCategory;
  });
  renderPlaylist();
}

// Controls events
playBtn.addEventListener("click", () => audio.play());
pauseBtn.addEventListener("click", () => audio.pause());

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % filteredList.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
  loadSong(currentIndex);
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Initialize
renderPlaylist();
volumeSlider.value = 0.5;
audio.volume = 0.5;
