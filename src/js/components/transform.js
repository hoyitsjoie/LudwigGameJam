import vec2 from '../vec2.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
} from './component.js';

const createTransform = (position, size) => ({
  position: position,
  size: size,
});

export const addTransform = (entityId, position, size) => {
  const entityTransform = getComponent(entityId, componentTypes.TRANSFORM);
  if (entityTransform) {
    console.error('CANNOT ADD ANOTHER TRANSFORM TO THIS ENTITY: ', entityId);
  }
  const transform = newComponent(
    entityId,
    componentTypes.TRANSFORM,
    createTransform(position, size),
  );
  return addComponent(transform);
};

export const addDefaultTransform = (entityId) =>
  addTransform(entityId, vec2(0, 0), vec2(10, 10));
