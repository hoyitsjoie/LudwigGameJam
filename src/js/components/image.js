import { vec2 } from '../vector.js';
import {
  addComponent,
  components,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';
import { ctx } from '../context.js';

export const addImage = (
  entityId,
  src,
  onLoad = () => {},
  updateTransform = true,
) => {
  const image = new Image();

  const component = newComponent(entityId, componentTypes.IMAGE, {
    image: image,
    loaded: false,
  });

  component.init = () => {
    image.onload = () => {
      updateComponent({
        id: component.id,
        loaded: true,
      });
      if (updateTransform) {
        const transform = getComponent(entityId, componentTypes.TRANSFORM);
        updateComponent({
          id: transform.id,
          size: vec2(image.width, image.height),
        });
      }

      onLoad();
    };
    image.src = src;
  };

  component.render = () => {
    const { image, loaded, entityId } = components[component.id];

    // get the component's transform
    const { position, size } = getComponent(entityId, componentTypes.TRANSFORM);

    // draw image at transform's position
    if (loaded) {
      ctx.drawImage(image, position.x, position.y, size.x, size.y);
    }
  };

  return addComponent(component);
};
