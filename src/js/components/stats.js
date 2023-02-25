import { getImageSource } from '../imageSource.js';
import { createLayer } from '../rendering/layer.js';
import { addLayerAppend, setActiveSceneByName } from '../rendering/scene.js';
import { vec2 } from '../vector.js';
import {
  addComponent,
  components,
  componentTypes,
  getComponent,
  newComponent,
  updateComponent,
} from './component.js';
import { createEntity } from './entity.js';
import { addImage } from './image.js';
import { addText } from './text.js';

let statsId = '';

export const addStats = (layerId) => {
  const { id: statsEntityId } = createEntity(layerId);
  const stats = newComponent(statsEntityId, componentTypes.STATS, {
    day: 1,
    energy: 0,
    money: 0,
    viewers: 0,
    knowledge: 0,
    items: [],
  });

  const extras = addPanel(layerId);

  // const { id: layerId } = createLayer();
  // addLayerAppend(layerId);
  // const { id: buttonEntityId } = createEntity(layerId);
  // addImage(buttonEntityId, getImageSource('cootsRoom/viewStats.png'));
  // const buttonTransform = getComponent(
  //   buttonEntityId,
  //   componentTypes.TRANSFORM,
  // );
  // updateComponent({
  //   id: buttonTransform.id,
  //   position: vec2(newPosition.x + 12, newPosition.y + 64),
  // });

  // const {id: energyTextId } = addText(entityId, textValue, 'italic 16px Arial', 'black', 'transparent', {
  //   offset: vec2(8, 24),
  // });

  statsId = stats.id;
  return addComponent({
    ...stats,
    ...extras,
  });
};

const addPanel = (layerId) => {
  const { id: entityId } = createEntity(layerId);
  addImage(
    entityId,
    getImageSource('cootsRoom/statsPanel.png'),
    () => {},
    false,
  );
  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const newPosition = vec2(8, 8);
  updateComponent({
    id: transform.id,
    position: newPosition,
    size: vec2(142, 96),
  });

  const dayTextId = addDay(layerId);
  const energyTextId = addEnergy(layerId);
  const viewersTextId = addViewers(layerId);

  return {
    dayTextId,
    energyTextId,
    viewersTextId,
  };
};

const addDay = (layerId) => {
  const { id: entityId } = createEntity(layerId);
  const { id: dayTextId } = addText(
    entityId,
    'Day 1',
    '18px Grandstander',
    'black',
    'transparent',
  );
  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const newPosition = vec2(24, 24);
  updateComponent({
    id: transform.id,
    position: newPosition,
    size: vec2(132, 80),
  });
  return dayTextId;
};

const addEnergy = (layerId) => {
  const { id: entityId } = createEntity(layerId);
  const { id: energyTextId } = addText(
    entityId,
    'Energy: 60',
    '18px Grandstander',
    'black',
    'transparent',
  );
  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const newPosition = vec2(24, 48);
  updateComponent({
    id: transform.id,
    position: newPosition,
    size: vec2(132, 80),
  });
  return energyTextId;
};

const addViewers = (layerId) => {
  const { id: entityId } = createEntity(layerId);
  const { id: viewersTextId } = addText(
    entityId,
    'Viewers: 2',
    '18px Grandstander',
    'black',
    'transparent',
  );
  const transform = getComponent(entityId, componentTypes.TRANSFORM);
  const newPosition = vec2(24, 72);
  updateComponent({
    id: transform.id,
    position: newPosition,
    size: vec2(132, 80),
  });
  return viewersTextId;
};

export const hasEnoughOfStat = (stat, value) => {
  const stats = components[statsId];
  return stats[stat] > value;
};

const maxStats = {
  day: 20,
  energy: 100,
  money: Infinity,
  knowledge: Infinity,
  viewers: Infinity,
};

export const getStat = (stat) => {
  const stats = components[statsId];
  return stats[stat];
};

export const updateNumberStat = (stat, value) => {
  const stats = components[statsId];
  const newValue = Math.max(0, Math.min(stats[stat] + value, maxStats[stat]));
  updateComponent({
    id: statsId,
    [stat]: newValue,
  });

  if (stat == 'day') {
    // udpate dayText
    updateComponent({
      id: stats.dayTextId,
      textValue: `Day ${newValue}`,
    });
  }

  if (stat == 'energy') {
    // udpate energyText
    updateComponent({
      id: stats.energyTextId,
      textValue: `Energy: ${newValue}`,
    });
  }

  if (stat == 'viewers') {
    // udpate viewersText
    updateComponent({
      id: stats.viewersTextId,
      textValue: `Viewers: ${newValue}`,
    });
  }
};

export const updateStat = (stat, value) => {
  updateComponent({
    id: statsId,
    [stat]: value,
  });
};

export const progressDays = (numOfDays) => {
  const stats = components[statsId];
  const previousDay = stats.day;
  const newDay = stats.day + numOfDays;
  updateComponent({
    id: statsId,
    day: newDay,
  });
  if (between(10, previousDay, newDay)) {
    setActiveSceneByName('day10Cutscene');
  }
  if (between(15, previousDay, newDay) && stats.viewers < 1000) {
    setActiveSceneByName('day15Cutscene');
  }
  if (between(20, previousDay, newDay)) {
    setActiveSceneByName('day20Cutscene');
  }
  if (between(30, previousDay, newDay)) {
    setActiveSceneByName('endGame');
  }
};

const between = (value, lowerBound, upperBound) => {
  return value > lowerBound && value <= upperBound;
};
