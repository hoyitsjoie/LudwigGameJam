const framesElement = document.getElementById('frames-counter');
let previousTimeMs = new Date().valueOf();
let currentTimeMs = new Date().valueOf();

let msSinceLastUpdate = 0;

export const updateTime = () => {
  previousTimeMs = currentTimeMs;
  currentTimeMs = new Date().valueOf();
  msSinceLastUpdate += getDeltaMs();

  if (msSinceLastUpdate > 200) {
    updateFramesDisplay();
    msSinceLastUpdate = 0;
  }
};

const updateFramesDisplay = () => {
  const msSinceLastFrame = getDeltaMs();
  const fps = 1000.0 / msSinceLastFrame;
  framesElement.innerText = Math.round(fps).toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false,
  });
};

export const getDeltaSec = () => (currentTimeMs - previousTimeMs) / 1000.0;
export const getDeltaMs = () => currentTimeMs - previousTimeMs;
