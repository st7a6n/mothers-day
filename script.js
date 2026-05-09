const music = document.querySelector("#backgroundMusic");
const enterButton = document.querySelector("#enterButton");
const musicBar = document.querySelector(".music-bar");
const playPauseButton = document.querySelector("#playPauseButton");
const trackName = document.querySelector("#trackName");
const volumeControl = document.querySelector("#volumeControl");
const collage = document.querySelector("#collage");
const gallerySection = document.querySelector(".gallery-section");
const envelope = document.querySelector("#envelope");
const openEnvelopeButton = document.querySelector("#openEnvelopeButton");

const defaultTrackName = "Rachmaninoff - Rhapsody on a Theme of Paganini - Variation 18";

if (music.getAttribute("src")) {
  trackName.textContent = defaultTrackName;
  musicBar.classList.add("is-visible");
}

function updatePlayButton() {
  playPauseButton.textContent = music.paused ? "Play" : "Pause";
}

async function startMusic() {
  if (!music.src) return;

  try {
    music.volume = Number(volumeControl.value);
    await music.play();
  } catch {
    trackName.textContent = `${defaultTrackName} - press Play`;
    updatePlayButton();
  }
}

enterButton.addEventListener("click", async () => {
  musicBar.classList.add("is-visible");
  await startMusic();
  gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
});

playPauseButton.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
  }
  updatePlayButton();
});

volumeControl.addEventListener("input", () => {
  music.volume = Number(volumeControl.value);
});

music.addEventListener("play", updatePlayButton);
music.addEventListener("pause", updatePlayButton);
window.addEventListener("load", startMusic, { once: true });

openEnvelopeButton.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("is-open");
  openEnvelopeButton.classList.toggle("is-open", isOpen);
  openEnvelopeButton.textContent = isOpen ? "收起来" : "点我打开！";
});
