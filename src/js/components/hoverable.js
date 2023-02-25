import { canvas } from '../context.js';
import { vec2 } from '../vector.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
} from './component.js';
import { entityIsActive } from './entity.js';

export const addHoverable = (entityId, hover, unhover) => {
  const hoverable = newComponent(entityId, componentTypes.HOVER);

  hoverable.init = () => {
    let hovering = false;

    // Handle the mousedown event
    canvas.addEventListener('mousemove', function (event) {
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
        if (!hovering) {
          hovering = true;
          hover();
        }
      } else {
        if (hovering) {
          hovering = false;
          unhover();
        }
      }
    });
  };

  return addComponent(hoverable);
};
