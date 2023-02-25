import { addEntityToLayer, layerContainsEntity } from '../rendering/layer.js';
import { activeSceneId, scenes } from '../rendering/scene.js';
import { addDefaultTransform } from './transform.js';

// map of entities
export const entities = {};

// global entity increment
let entityInc = 0;
const newEntity = () => ({
  id: `Entity_${entityInc++}`,
});

// create a new entity and add it to the map
export const createEntity = (layerId) => {
  const entity = addEntity(newEntity());
  // add transform component
  addDefaultTransform(entity.id);
  addEntityToLayer(layerId, entity.id);
  return entity;
};

// add an entity to the map
export const addEntity = (entity) => {
  // ensure this id does not exist
  if (entities[entity.id]) {
    console.error('ENTITY ALREADY EXISTS: ', entity);
  }
  // add the entity to the map
  entities[entity.id] = entity;
  return entity;
};

// update the supplied entity
export const updateEntity = (entity) => {
  // ensure this id exists
  if (!entities[entity.id]) {
    console.error('ENTITY DOES NOT EXIST: ', entity);
  }
  // update the entity
  entities[entity.id] = {
    ...entities[entity.id],
    ...entity,
  };

  return {
    ...entities[entity.id],
    ...entity,
  };
};

// remove the entity from the map
export const removeEntity = (entityId) => {
  delete entities[entityId];
};

export const entityIsActive = (entityId) => {
  const activeScene = scenes[activeSceneId];
  for (const layerId of activeScene.layerIds) {
    if (layerContainsEntity(layerId, entityId)) return true;
  }
  return false;
};
