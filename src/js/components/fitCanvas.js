import { vec2 } from '../vector.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';

export const addFitCanvas = (entityId, scale) => {
  const component = newComponent(entityId, componentTypes.FIT_CANVAS, {
    scale: scale,
  });

  component.init = () => {
    const transform = getComponent(entityId, componentTypes.TRANSFORM);
    const { size: previousSize } = transform;
    const ratio = (previousSize.x * 1.0) / previousSize.y;
    const size = vec2(
      canvas.width * scale,
      (canvas.width * scale * 1.0) / ratio,
    );
    const position = vec2(
      (canvas.width - size.x) / 2.0,
      (canvas.height - size.y) / 2.0,
    );
    updateComponent({
      id: transform.id,
      size: size,
      position: position,
    });
  };

  return addComponent(component);
};
