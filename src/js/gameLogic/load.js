import {
  addLayerAppend,
  createScene,
  setActiveScene,
  setActiveSceneByName,
} from '../rendering/scene.js';
import { createLayer } from '../rendering/layer.js';
import { createEntity } from '../components/entity.js';
import { addImage } from '../components/image.js';
import {
  componentTypes,
  disableComponentId,
  enableComponentId,
  getComponent,
  updateComponent,
} from '../components/component.js';
import { addClickable } from '../components/clickable.js';
import { addDraggable } from '../components/draggable.js';
import { addHoverable } from '../components/hoverable.js';
import { vec2 } from '../vector.js';
import { canvas } from '../context.js';
import { addHotkey } from '../components/hotkey.js';
import { toggleGameRunning } from '../entryPoint.js';
import { addBackgroundImage } from '../components/backgroundImage.js';
import { addText } from '../components/text.js';
import { addImageWithCaption } from '../components/imageWithCaption.js';
import { initializeScenes } from './sceneNavigation.js';

export default () => {
  initializeScenes();

  // temp to test directly faster
  // setActiveSceneByName('cootsRoom');

  // const sceneIds = generateScenes();
  // addNextLayer(sceneIds);
  // addPauseLayer(sceneIds);
};

const generateScenes = () => {
  return [generateScene1(), generateScene2(), generateScene3()];
};

const generateScene1 = () => {
  const { id: sceneId } = createScene();
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const backgroundEntity = createEntity(layerId);
  addBackgroundImage(backgroundEntity.id, '../assets/background.png');

  const starEntity = createEntity(layerId);

  const redStar = addImage(starEntity.id, '../assets/red_star.png');
  const blueStar = addImage(starEntity.id, '../assets/blue_star.png');

  let isBlue = false;
  const toggle = () => {
    enableComponentId(isBlue ? redStar.id : blueStar.id);
    disableComponentId(isBlue ? blueStar.id : redStar.id);
    isBlue = !isBlue;
  };
  disableComponentId(blueStar.id);
  addClickable(starEntity.id, toggle);

  addDraggable(starEntity.id);

  return sceneId;
};

const generateScene2 = () => {
  const { id: sceneId } = createScene();
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const e = createEntity(layerId);

  const redStar = addImage(e.id, '../assets/red_star.png');
  const blueStar = addImage(e.id, '../assets/blue_star.png');

  const hover = () => {
    disableComponentId(redStar.id);
    enableComponentId(blueStar.id);
  };
  const unhover = () => {
    enableComponentId(redStar.id);
    disableComponentId(blueStar.id);
  };
  disableComponentId(blueStar.id);
  addHoverable(e.id, hover, unhover);

  addDraggable(e.id);

  return sceneId;
};

const generateScene3 = () => {
  const { id: sceneId } = createScene();
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const starEntity = createEntity(layerId);
  addImageWithCaption(starEntity.id, '../assets/blue_star.png', 'a blue star!');

  return sceneId;
};

const addNextLayer = (sceneIds) => {
  let currentSceneIndex = 0;

  // create a layer for next button
  const { id: layerId } = createLayer();
  // loop through all scenes
  for (let i = 0; i < sceneIds.length - 1; i++) {
    const sceneId = sceneIds[i];
    // add layer to scene
    setActiveScene(sceneId);
    addLayerAppend(layerId);
  }

  // set the first scene as active
  setActiveScene(sceneIds[0]);

  const nextScene = () => {
    if (currentSceneIndex + 1 < sceneIds.length) {
      console.log('goto next scene');
      setActiveScene(sceneIds[++currentSceneIndex]);
    } else {
      console.error('no more scenes');
    }
  };

  const onLoad = () => {
    const transform = getComponent(nextButton.id, componentTypes.TRANSFORM);
    const size = vec2(transform.size.x * 0.3, transform.size.y * 0.3);
    const position = vec2(
      canvas.width - size.x - 16,
      canvas.height - size.y - 16,
    );
    updateComponent({
      id: transform.id,
      size: size,
      position: position,
    });
  };

  const nextButton = addButton(
    layerId,
    '../assets/next.png',
    onLoad,
    nextScene,
  );
};

const addPauseLayer = (sceneIds) => {
  // create a layer for next button
  const { id: layerId } = createLayer();
  // loop through all scenes
  for (const sceneId of sceneIds) {
    // add layer to scene
    setActiveScene(sceneId);
    addLayerAppend(layerId);
  }

  // set the first scene as active
  setActiveScene(sceneIds[0]);

  const entity = createEntity(layerId);
  addHotkey(entity.id, {
    Escape: toggleGameRunning,
  });
};

const addButton = (layerId, src, onLoad, onClick) => {
  const e = createEntity(layerId);
  addImage(e.id, src, onLoad);
  addClickable(e.id, onClick);
  addHoverable(
    e.id,
    () => setCursor('pointer'),
    () => setCursor('default'),
  );
  return e;
};

const setCursor = (type) => {
  canvas.style.cursor = type;
};
