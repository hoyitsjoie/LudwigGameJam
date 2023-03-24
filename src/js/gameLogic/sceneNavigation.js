import { addBackgroundImage } from '../components/backgroundImage.js';
import { addClickable } from '../components/clickable.js';
import {
  componentTypes,
  disableComponentId,
  enableComponentId,
  getComponent,
  updateComponent,
} from '../components/component.js';
import { createEntity } from '../components/entity.js';
import { addHoverable } from '../components/hoverable.js';
import { addImage } from '../components/image.js';
import {
  addStats,
  getStat,
  updateNumberStat,
  updateStat,
} from '../components/stats.js';
import { addText } from '../components/text.js';
import { canvas } from '../context.js';
import { getImageSource } from '../imageSource.js';
import { createLayer } from '../rendering/layer.js';
import {
  addLayerAppend,
  createScene,
  removeLayerId,
  setActiveSceneByName,
} from '../rendering/scene.js';
import { vec2 } from '../vector.js';
import { createClickCutscene } from './clickCutscene.js';

export const initializeScenes = () => {
  initializeMainMenu();
  initializeInfo();
  initializeCredits();
  initializeGame();

  setActiveSceneByName('mainMenu');
};

export const initializeMainMenu = () => {
  createScene('mainMenu');
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const backgroundEntity = createEntity(layerId);
  addBackgroundImage(
    backgroundEntity.id,
    getImageSource('mainMenu/mainMenu.png'),
  );

  const handlePlayClicked = () => {
    setActiveSceneByName('intro');
  };

  const handleInfoClicked = () => {
    setActiveSceneByName('infoPage');
  };

  const handleCreditsClicked = () => {
    setActiveSceneByName('creditsPage');
  };

  addMainMenuButton(layerId, 'play', canvas.height - 240, handlePlayClicked);
  addMainMenuButton(layerId, 'info', canvas.height - 170, handleInfoClicked);
  addMainMenuButton(
    layerId,
    'credits',
    canvas.height - 100,
    handleCreditsClicked,
  );
};

const addMainMenuButton = (layerId, textValue, yPos, onClick) => {
  const entity = createEntity(layerId);
  const image = addImage(
    entity.id,
    getImageSource('mainMenu/button.png'),
    () => {},
    false,
  );
  const imageHover = addImage(
    entity.id,
    getImageSource('mainMenu/buttonHighlight.png'),
    () => {},
    false,
  );
  disableComponentId(imageHover.id);

  const text = addText(
    entity.id,
    textValue,
    '32px Grandstander',
    '#E4D8C3',
    undefined,
    {
      offset: vec2(20, 10),
    },
  );
  addHoverable(
    entity.id,
    () => {
      disableComponentId(image.id);
      enableComponentId(imageHover.id);
      updateComponent({
        id: text.id,
        color: '#522510',
      });
      setCursor('pointer');
    },
    () => {
      disableComponentId(imageHover.id);
      enableComponentId(image.id);
      updateComponent({
        id: text.id,
        color: '#E4D8C3',
      });
      setCursor('default');
    },
  );

  addClickable(entity.id, onClick);

  const transform = getComponent(entity.id, componentTypes.TRANSFORM);
  updateComponent({
    id: transform.id,
    size: vec2(185, 48),
    position: vec2(canvas.width - 225, yPos),
  });
};

const setCursor = (type) => {
  canvas.style.cursor = type;
};

export const initializeInfo = () => {
  createScene('infoPage');
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const backgroundEntity = createEntity(layerId);
  addBackgroundImage(
    backgroundEntity.id,
    getImageSource('mainMenu/infoBackground.png'),
  );

  const handlebackToHomeClicked = () => {
    setActiveSceneByName('mainMenu');
  };

  const backToHomeEntity = createEntity(layerId);
  addImage(
    backToHomeEntity.id,
    getImageSource('mainMenu/back.png'),
    () => {},
    false,
  );
  addClickable(backToHomeEntity.id, handlebackToHomeClicked);
  const backToHomeTransform = getComponent(
    backToHomeEntity.id,
    componentTypes.TRANSFORM,
  );
  updateComponent({
    id: backToHomeTransform.id,
    size: vec2(232, 48),
    position: vec2(394, 313),
  });
};
export const initializeCredits = () => {
  createScene('creditsPage');
  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const backgroundEntity = createEntity(layerId);
  addBackgroundImage(
    backgroundEntity.id,
    getImageSource('mainMenu/creditsBackground.png'),
  );

  const handlebackToHomeClicked = () => {
    setActiveSceneByName('mainMenu');
  };

  const backToHomeEntity = createEntity(layerId);
  addImage(
    backToHomeEntity.id,
    getImageSource('mainMenu/back.png'),
    () => {},
    false,
  );
  addClickable(backToHomeEntity.id, handlebackToHomeClicked);
  const backToHomeTransform = getComponent(
    backToHomeEntity.id,
    componentTypes.TRANSFORM,
  );
  updateComponent({
    id: backToHomeTransform.id,
    size: vec2(232, 48),
    position: vec2(394, 313),
  });
};

const initializeGame = () => {
  const createCutsceneFrame = (mImg, fImg) => ({
    midgroundImageSrc: getImageSource(mImg),
    foregroundImageSrc: getImageSource(fImg),
  });
  createClickCutscene(
    'intro',
    getImageSource('intro/ludwigRoom.png'),
    [
      createCutsceneFrame('intro/ludwigSmile.png', 'intro/dialogue1.png'),
      createCutsceneFrame('intro/ludwigHesitant.png', 'intro/dialogue2.png'),
      createCutsceneFrame('intro/ludwigSmile.png', 'intro/dialogue3.png'),
      createCutsceneFrame('intro/cootsDefault.png', 'intro/dialogue4.png'),
      createCutsceneFrame('intro/ludwigYay.png', 'intro/dialogue5.png'),
      createCutsceneFrame('intro/cootsDefault.png', 'intro/dialogue6.png'),
      createCutsceneFrame('intro/cootsDefault.png', 'intro/dialogue7.png'),
    ],
    () => setActiveSceneByName('cootsRoom'),
  );

  createCootsRoom();
  createCootsStream();
};

const createCootsRoom = () => {
  createScene('cootsRoom');

  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const { id: backgroundEntityId } = createEntity(layerId);
  addBackgroundImage(
    backgroundEntityId,
    getImageSource('cootsRoom/cootsRoom.png'),
  );

  const { id: toStreamEntityId } = createEntity(layerId);
  addImage(
    toStreamEntityId,
    getImageSource('cootsRoom/toStream.png'),
    () => {},
    false,
  );
  addClickable(toStreamEntityId, () => setActiveSceneByName('cootsStream'));
  const transform = getComponent(toStreamEntityId, componentTypes.TRANSFORM);
  const size = vec2(103 * 0.5, 124 * 0.5);
  const position = vec2(canvas.width - 180, canvas.height - 90);
  updateComponent({
    id: transform.id,
    size,
    position,
  });

  addSleepButton(layerId);
  addFridgeButton(layerId);

  addStats(layerId);
};

const addSleepButton = (layerId) => {
  const { id: sleepLayerId } = createLayer();
  const { id: sleepLayerEntityId } = createEntity(sleepLayerId);
  addImage(sleepLayerEntityId, getImageSource('cootsRoom/sleepPopup.png'));
  alignPopup(sleepLayerEntityId);
  addCloseButton(sleepLayerId);

  const handleSleepClicked = () => {
    // show layer
    addLayerAppend(sleepLayerId);
    updateNumberStat('day', 1);
    updateNumberStat('energy', 50);
  };

  const entity = createEntity(layerId);
  addImage(
    entity.id,
    getImageSource('cootsRoom/sleepButton.png'),
    () => {},
    false,
  );
  addClickable(entity.id, handleSleepClicked);
  const transform = getComponent(entity.id, componentTypes.TRANSFORM);
  updateComponent({
    id: transform.id,
    size: vec2(131, 40),
    position: vec2(335, 231),
  });
};

const addFridgeButton = (layerId) => {
  const { id: goodLayerId } = createLayer();
  const { id: goodLayerEntityId } = createEntity(goodLayerId);
  addImage(goodLayerEntityId, getImageSource('cootsRoom/goodFridge.png'));
  alignPopup(goodLayerEntityId);
  addCloseButton(goodLayerId);

  const { id: chefsHatLayerId } = createLayer();
  const { id: chefsHatLayerEntityId } = createEntity(chefsHatLayerId);
  addImage(
    chefsHatLayerEntityId,
    getImageSource('cootsRoom/chefsHatFridge.png'),
  );
  alignPopup(chefsHatLayerEntityId);
  addCloseButton(chefsHatLayerId);

  const onClick = () => {
    const day = getStat('day');
    if (day > 5 && !getStat('unlockedBakingStream')) {
      // add chefs hat layer
      addLayerAppend(chefsHatLayerId);
      // update stats
      updateStat('unlockedBakingStream', true);
    } else {
      // add good layer
      addLayerAppend(goodLayerId);
      // update stats
      updateNumberStat('knowledge', 10);
      updateNumberStat('energy', -10);
    }
  };

  const entity = createEntity(layerId);
  addImage(
    entity.id,
    getImageSource('cootsRoom/fridgeButton.png'),
    () => {},
    false,
  );
  addClickable(entity.id, onClick);
  const transform = getComponent(entity.id, componentTypes.TRANSFORM);
  updateComponent({
    id: transform.id,
    size: vec2(174, 40),
    position: vec2(515, 106),
  });
};

const alignPopup = (entityId) => {
  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const size = vec2(460, 272);
  const position = vec2(
    (canvas.width - size.x) / 2.0,
    (canvas.height - size.y) / 2.0,
  );

  updateComponent({
    id: transform.id,
    size,
    position,
  });
};

const addCloseButton = (layerId) => {
  const { id: entityId } = createEntity(layerId);
  addImage(entityId, getImageSource('cootsRoom/closeButton.png'));
  addClickable(entityId, () => removeLayerId(layerId));

  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const size = vec2(43, 32);
  const position = vec2(524, 77);

  updateComponent({
    id: transform.id,
    size,
    position,
  });
};

const createCootsStream = () => {
  createScene('cootsStream');

  const { id: layerId } = createLayer();
  addLayerAppend(layerId);

  const { id: backgroundEntityId } = createEntity(layerId);
  addBackgroundImage(
    backgroundEntityId,
    getImageSource('cootsStream/streamBackground.png'),
  );

  //addClickable(backgroundEntityId, () => setActiveSceneByName('cootsRoom'));

  const { id: toStreamEntityId } = createEntity(layerId);
  addImage(
    toStreamEntityId,
    getImageSource('cootsRoom/toStream.png'),
    () => {},
    false,
  );

  addClickable(toStreamEntityId, () => setActiveSceneByName('cootsRoom'));
  const transform = getComponent(toStreamEntityId, componentTypes.TRANSFORM);
  const size = vec2(103 * 0.5, 124 * 0.5);
  const position = vec2(canvas.width - 180, canvas.height - 90);
  updateComponent({
    id: transform.id,
    size,
    position,
  });

  //add stream button
  addStreamButton(layerId);

};

const addStreamButton = (layerId) => {
  const { id: sleepLayerId } = createLayer();
  const { id: sleepLayerEntityId } = createEntity(sleepLayerId);
  addImage(sleepLayerEntityId, getImageSource('cootsStream/streamPopup.png'));
  alignPopup(sleepLayerEntityId);
  addCloseButton(sleepLayerId);

  const handleStreamClicked = () => {
    // show layer
    addLayerAppend(sleepLayerId);
    updateNumberStat('energy', -40);
  };

  const entity = createEntity(layerId);
  addImage(
    entity.id,
    getImageSource('cootsStream/streamButton.png'),
    () => {},
    false,
  );
  addClickable(entity.id, handleStreamClicked);
  const transform = getComponent(entity.id, componentTypes.TRANSFORM);
  updateComponent({
    id: transform.id,
    size: vec2(160, 50),
    position: vec2(390, 151),
  });
};
