import { addBackgroundImage } from '../components/backgroundImage.js';
import { addClickable } from '../components/clickable.js';
import {
  componentTypes,
  getComponent,
  updateComponent,
} from '../components/component.js';
import { createEntity } from '../components/entity.js';
import { addImage } from '../components/image.js';
import { canvas } from '../context.js';
import { createLayer } from '../rendering/layer.js';
import {
  addLayerAppend,
  createScene,
  removeLayerId,
} from '../rendering/scene.js';
import { vec2 } from '../vector.js';

export const createClickCutscene = (
  sceneName,
  backgroundImageSrc = '',
  pages = [],
  onEnd = () => {},
) => {
  // create scene
  createScene(sceneName);

  // handle progress to next page
  const pageLayers = [];
  let currentPageLayerIndex = 0;
  const progressToNextPage = () => {
    // remove layers
    removeLayerId(pageLayers[currentPageLayerIndex].midgroundLayerId);
    removeLayerId(pageLayers[currentPageLayerIndex].foregroundLayerId);

    // increment currentPageLayerIndex
    currentPageLayerIndex += 1;

    if (currentPageLayerIndex < pageLayers.length) {
      // append layers
      addLayerAppend(pageLayers[currentPageLayerIndex].midgroundLayerId);
      addLayerAppend(pageLayers[currentPageLayerIndex].foregroundLayerId);
    } else {
      onEnd();
    }
  };

  // create background layer
  createBackgroundLayer(backgroundImageSrc, progressToNextPage);

  // set up layers
  for (const { midgroundImageSrc = '', foregroundImageSrc = '' } of pages) {
    pageLayers.push({
      midgroundLayerId: createMidgroundLayer(midgroundImageSrc),
      foregroundLayerId: createForegroundLayer(foregroundImageSrc),
    });
  }

  // set first page active
  currentPageLayerIndex = 0;
  addLayerAppend(pageLayers[currentPageLayerIndex].midgroundLayerId);
  addLayerAppend(pageLayers[currentPageLayerIndex].foregroundLayerId);
};

const createBackgroundLayer = (imageSrc, progress) => {
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const { id: entityId } = createEntity(layerId);
  addBackgroundImage(entityId, imageSrc);
  addClickable(entityId, progress);
};

const createMidgroundLayer = (imageSrc) => {
  const { id: layerId } = createLayer();
  const { id: entityId } = createEntity(layerId);
  addImage(entityId, imageSrc, () => {
    alignMidground(entityId);
  });

  return layerId;
};

const createForegroundLayer = (imageSrc) => {
  const { id: layerId } = createLayer();
  const { id: entityId } = createEntity(layerId);
  addImage(entityId, imageSrc, () => {}, false);
  alignDialogue(entityId);

  return layerId;
};

const alignMidground = (entityId) => {
  const { id, size } = getComponent(entityId, componentTypes.TRANSFORM);
  const newSize = vec2(size.x * 0.7, size.y * 0.7);
  updateComponent({
    id: id,
    position: vec2((canvas.width - newSize.x) / 2.0, canvas.height - newSize.y),
    size: newSize,
  });
};

const alignDialogue = (entityId) => {
  const { id } = getComponent(entityId, componentTypes.TRANSFORM);
  updateComponent({
    id: id,
    size: vec2(625, 158),
    position: vec2((canvas.width - 625) / 2.0, canvas.height - 158 - 16),
  });
};
