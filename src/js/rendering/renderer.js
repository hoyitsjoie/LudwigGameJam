import { components } from '../components/component.js';
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
  for (const layerId of activeScene.layerIds) {
    // render the layer
    renderLayer(layerId);
  }
};

const renderLayer = (layerId) => {
  // get layer
  const layer = layers[layerId];

  // loop through layer's entities
  for (const entityId of layer.entityIds) {
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
  for (const component of Object.values(entityComponents)) {
    // check if component is enabled and renderable
    const { render, enabled } = component;
    if (render && enabled) {
      render();
    }
  }
};
