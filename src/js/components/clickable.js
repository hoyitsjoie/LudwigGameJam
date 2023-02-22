import { canvas } from '../context.js';
import vec2 from '../vec2.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
} from './component.js';
import { entityIsActive } from './entity.js';

export const addClickable = (entityId, click) => {
  const clickable = newComponent(entityId, componentTypes.HOVER);

  clickable.init = () => {
    let clicking = false;

    // Handle the mousedown event
    canvas.addEventListener('mousedown', function (event) {
      if (!entityIsActive(entityId)) return;
      // get the mouse position on the canvas
      const mouseCoords = vec2(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
      // get the position and size
      const { position, size } = getComponent(
        entityId,
        componentTypes.TRANSFORM,
      );

      if (
        mouseCoords.x >= position.x &&
        mouseCoords.x <= position.x + size.x &&
        mouseCoords.y >= position.y &&
        mouseCoords.y <= position.y + size.y
      ) {
        clicking = true;
      }
    });

    // Handle the mousemove event
    canvas.addEventListener('mousemove', function (event) {
      if (!entityIsActive(entityId)) return;
      if (clicking) clicking = false;
    });

    // Handle the click event
    canvas.addEventListener('mouseup', function (event) {
      if (!entityIsActive(entityId)) return;
      if (clicking) {
        click();
      }
    });
  };

  return addComponent(clickable);
};
