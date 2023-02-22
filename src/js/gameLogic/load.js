import {
  addLayerAppend,
  createScene,
  setActiveScene,
} from '../rendering/scene.js';
import { createLayer } from '../rendering/layer.js';
import { createEntity, updateEntity } from '../components/entity.js';
import { addImage } from '../components/image.js';
import {
  components,
  componentTypes,
  disableComponentId,
  enableComponentId,
  getComponent,
  updateComponent,
} from '../components/component.js';
import { addClickable } from '../components/clickable.js';
import { addDraggable } from '../components/draggable.js';
import { addHoverable } from '../components/hoverable.js';
import vec2 from '../vec2.js';
import { canvas } from '../context.js';

export default () => {
  const sceneIds = generateScenes();
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
    console.log(components[transform.id]);
  };

  const nextButton = addButton(
    layerId,
    '../assets/next.png',
    onLoad,
    nextScene,
  );
};

const generateScenes = () => {
  const scene1 = generateScene1();
  const scene2 = generateScene2();

  return [scene1, scene2];
};

const generateScene1 = () => {
  const { id: sceneId } = createScene();
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const e = createEntity(layerId);

  const redStar = addImage(e.id, '../assets/red_star.png');
  const blueStar = addImage(e.id, '../assets/blue_star.png');

  let isBlue = false;
  const toggle = () => {
    enableComponentId(isBlue ? redStar.id : blueStar.id);
    disableComponentId(isBlue ? blueStar.id : redStar.id);
    isBlue = !isBlue;
  };
  disableComponentId(blueStar.id);
  addClickable(e.id, toggle);

  addDraggable(e.id);

  const newButton = addButton(
    layerId,
    '../assets/background.png',
    () => {
      const transform = getComponent(newButton.id, componentTypes.TRANSFORM);
      const size = vec2(canvas.width, canvas.height);
      // const position = vec2(canvas.width - size.x - 16, 16);
      updateComponent({
        id: transform.id,
        size: size,
        // position: position,
      });
    },
    () => console.log('hi'),
  );

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

const addButton = (layerId, src, onLoad, onClick) => {
  const e = createEntity(layerId);
  const image = addImage(e.id, src, onLoad);
  const clickable = addClickable(e.id, onClick);
  return e;
};
