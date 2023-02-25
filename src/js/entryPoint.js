import { components, updateComponent } from './components/component.js';
import { render } from './rendering/renderer.js';
import { updateTime } from './time.js';
import load from './gameLogic/load.js';

const start = () => {
  load();
  init();
  loop();
};

const init = () => {
  // loop through the components
  for (const component of Object.values(components)) {
    // check if component hasn't been initialized
    if (!component.initialized) {
      // initialize component
      component.init();

      // update initialized flag
      updateComponent({
        id: component.id,
        initialized: true,
      });
    }
  }
};

const update = () => {
  // initializes components that havent been initialized yet
  init();

  // loop through the components
  for (const component of Object.values(components)) {
    // check if component is initialized
    if (component.initialized) {
      // component needs to be initialized to be updated
      component.update();
    }
  }
};

let running = false;
export const toggleGameRunning = () => {
  // toggle if the game is running
  running = !running;
  // check if the game running
  console.log(running ? 'played' : 'paused');
  if (running) {
    // restart the loop
    window.requestAnimationFrame(tick);
  }
};

const loop = () => {
  // start the loop
  running = true;
  window.requestAnimationFrame(tick);
  // add untracked pause key
};

const tick = () => {
  // update the time
  updateTime();
  // update the components
  update();
  // render the entities
  render();
  // check if the game is still running
  if (running) {
    // request a new frame
    window.requestAnimationFrame(tick);
  }
};

// start the game
start();
