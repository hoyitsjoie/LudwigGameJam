export const scenes = {};

export let activeSceneId = null;

// global scene increment
let sceneInc = 0;
const newScene = () => ({
  id: `Scene_${sceneInc++}`,
  layerIds: [],
});

// create a new scene and add it to the map
export const createScene = () => {
  const scene = addScene(newScene());
  setActiveScene(scene.id);
  return scene;
};

// add a scene to the map
export const addScene = (scene) => {
  // ensure this id does not exist
  if (scenes[scene.id]) {
    console.error('SCENE ALREADY EXISTS: ', scene);
  }
  // add the scene to the map
  scenes[scene.id] = scene;
  return scene;
};

// update the supplied scene
export const updateScene = (scene) => {
  // ensure this id exists
  if (!scenes[scene.id]) {
    console.error('SCENE DOES NOT EXIST: ', scene);
  }
  // update the scene
  scenes[scene.id] = {
    ...scenes[scene.id],
    ...scene,
  };

  return {
    ...scenes[scene.id],
    ...scene,
  };
};

export const setActiveScene = (sceneId) => {
  activeSceneId = sceneId;
};

export const addLayerAppend = (layerId) => {
  scenes[activeSceneId].layerIds.push(layerId);
};

export const addLayerInsert = (layerId, index) => {
  scenes[activeSceneId].layerIds.splice(index, 0, layerId);
};

export const removeLayerId = (layerId) => {
  const index = scenes[activeSceneId].layerIds.indexOf(layerId);
  removeLayerIndex(index);
};

export const removeLayerIndex = (index) => {
  scenes[activeSceneId].layerIds.splice(index, 1);
};
