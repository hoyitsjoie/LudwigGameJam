import { vec2, vec4 } from '../vector.js';
import {
  addComponent,
  components,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';
import { ctx } from '../context.js';

export const addRect = (
  entityId,
  color = vec4(256, 256, 256, 1),
  position = vec2(),
  size = vec2(1, 1),
) => {
  const component = newComponent(entityId, componentTypes.RECT, {
    color: color,
  });

  component.init = () => {
    const transform = getComponent(entityId, componentTypes.TRANSFORM);
    updateComponent({
      id: transform.id,
      position: position,
      size: size,
    });

    onLoad();
  };

  component.render = () => {
    // draw a rect from a RECT component
    const { color, entityId } = components[component.id];

    // get the component's transform
    const { position, size } = getComponent(entityId, componentTypes.TRANSFORM);

    // draw rect at transform's position
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size.x, size.y);
  };

  return addComponent(component);
};
