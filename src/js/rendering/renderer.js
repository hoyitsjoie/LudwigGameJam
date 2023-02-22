import { entities } from '../components/entity.js';
import {
  components,
  componentTypes,
  getComponent,
} from '../components/component.js';
import { canvas, ctx } from '../context.js';
import { activeSceneId, scenes } from './scene.js';
import { layers } from './layer.js';

// draw the canvas
export const render = () => {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // get active scene
  const activeScene = scenes[activeSceneId];

  // loop through scene's layers
  for (let i = 0; i < activeScene.layerIds.length; i++) {
    const layerId = activeScene.layerIds[i];
    // render the layer
    renderLayer(layerId);
  }

  // // loop through all components
  // for (let i = 0; i < Object.values(components).length; i++) {
  //   const component = Object.values(components)[i];
  //   // check if component is an enabled image
  //   const { type, enabled } = component;
  //   if (type == componentTypes.IMAGE && enabled) {
  //     // draw image
  //     drawImage(component);
  //   }
  // }
};

const renderLayer = (layerId) => {
  // get layer
  const layer = layers[layerId];

  // console.log(layer);

  // loop through layer's entities
  for (let i = 0; i < layer.entityIds.length; i++) {
    const entityId = layer.entityIds[i];
    // render entity
    renderEntity(entityId);
  }
};

const renderEntity = (entityId) => {
  // get entity's components
  const entityComponents = Object.values(components).filter(
    (component) => component.entityId == entityId,
  );
  // loop through entity's components
  for (let i = 0; i < Object.values(entityComponents).length; i++) {
    const component = Object.values(entityComponents)[i];
    // check if component is an enabled image
    const { type, enabled } = component;
    if (type == componentTypes.IMAGE && enabled) {
      // render image
      renderImage(component);
    }
  }
};

// draw an image from an IMAGE component
const renderImage = (component) => {
  const { image, loaded, entityId } = component;

  // get the component's transform
  const { position, size } = getComponent(entityId, componentTypes.TRANSFORM);

  // console.log(entityId, position, size);

  // draw image at transform's position
  if (loaded) {
    ctx.drawImage(image, position.x, position.y, size.x, size.y);
  }
};
