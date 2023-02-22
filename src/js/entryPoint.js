import { components } from './components/component.js';
import { render } from './rendering/renderer.js';
import { updateTime } from './time.js';
import load from './gameLogic/load.js';

const start = () => {
  load();
  init();
  loop();
};

const init = () => {
  for (let i = 0; i < Object.values(components).length; i++) {
    const component = Object.values(components)[i];
    component.init();
  }
};

let running = false;

const loop = () => {
  running = true;
  window.requestAnimationFrame(tick);

  // escape is toggle rendering
  document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
      running = !running;
      console.log('toggled to ', running);
      if (running) {
        window.requestAnimationFrame(tick);
      }
    }
  });
  // setTimeout(() => clearInterval(handler), 3000);
};

const tick = () => {
  // console.log('hello', entities, components);
  updateTime();
  render();
  if (running) {
    window.requestAnimationFrame(tick);
  }
};

start();
