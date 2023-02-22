import { entities } from './entity.js';
import vec2 from '../vec2.js';
import {
  addComponent,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';

export const addImage = (entityId, src, onLoad = () => {}) => {
  const image = new Image();

  const imageComponent = newComponent(entityId, componentTypes.IMAGE, {
    image: image,
    loaded: false,
  });

  imageComponent.init = () => {
    image.onload = () => {
      updateComponent({
        id: imageComponent.id,
        loaded: true,
      });
      const transform = getComponent(entityId, componentTypes.TRANSFORM);
      updateComponent({
        id: transform.id,
        size: vec2(image.width, image.height),
      });

      onLoad();
    };
    image.src = src;
  };

  return addComponent(imageComponent);
};
