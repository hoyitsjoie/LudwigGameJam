import { canvas } from '../context.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';
import { vec2 } from '../vector.js';
import { entityIsActive } from './entity.js';

export const addDraggable = (
  entityId,
  dragStart = () => {},
  dragStop = () => {},
) => {
  const draggable = newComponent(entityId, componentTypes.DRAGGABLE);

  draggable.init = () => {
    let dragging = false;
    let imageStart = vec2();
    let mouseStart = vec2();

    // Handle the mousedown event
    canvas.addEventListener('mousedown', function (event) {
      if (!entityIsActive(entityId)) {
        return;
      }
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
        dragging = true;
        imageStart = position;
        mouseStart = mouseCoords;
        dragStart();
      }
    });

    // Handle the mousemove event
    canvas.addEventListener('mousemove', function (event) {
      if (!dragging || !entityIsActive(entityId)) return;

      const mouseCoords = vec2(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop,
      );
      const updatedTransform = vec2(
        imageStart.x + mouseCoords.x - mouseStart.x,
        imageStart.y + mouseCoords.y - mouseStart.y,
      );
      const transform = getComponent(entityId, componentTypes.TRANSFORM);
      updateComponent({
        id: transform.id,
        position: updatedTransform,
      });
    });

    // Handle the mouseup event
    canvas.addEventListener('mouseup', function () {
      if (dragging && entityIsActive(entityId)) {
        dragging = false;
        dragStop();
      }
    });
  };

  return addComponent(draggable);
};
