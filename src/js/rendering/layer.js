export const layers = {};

// global layer increment
let layerInc = 0;
const newLayer = () => ({
  id: `Layer_${layerInc++}`,
  entityIds: [],
});

// create a new layer and add it to the map
export const createLayer = () => {
  let layer = addLayer(newLayer());
  return layer;
};

// add an layer to the map
export const addLayer = (layer) => {
  // ensure this id does not exist
  if (layers[layer.id]) {
    console.error('LAYER ALREADY EXISTS: ', layer);
  }
  // add the layer to the map
  layers[layer.id] = layer;
  return layer;
};

export const addEntityToLayer = (layerId, entityId) => {
  layers[layerId].entityIds.push(entityId);
};

export const removeEntityFromLayer = (layerId, entityId) => {
  layers[layerId].entityIds = layers[layerId].entityIds.filter(
    (eId) => eId != entityId,
  );
};

export const layerContainsEntity = (layerId, entityId) => {
  const layer = layers[layerId];
  return layer.entityIds.includes(entityId);
};
