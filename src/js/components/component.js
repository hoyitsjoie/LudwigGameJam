// map of components
export const components = {};

// global component increment
let componentInc = 0;

// create a new component with extra fields
export const newComponent = (entityId, type, extraFields = {}) => ({
  id: `Component_${componentInc++}`,
  entityId: entityId,
  type: type,
  enabled: true,
  init: () => {},
  initialized: false,
  update: () => {},
  ...extraFields,
});

// add an component to the map
export const addComponent = (component) => {
  // ensure this id does not exist
  if (components[component.id]) {
    console.error('COMPONENT ALREADY EXISTS: ', component);
  }
  // add the component to the map
  components[component.id] = component;
  return component;
};

// update the supplied component
export const updateComponent = (component) => {
  // ensure this id exists
  if (!components[component.id]) {
    console.error('COMPONENT DOES NOT EXIST: ', component);
  }
  // update the component
  components[component.id] = {
    ...components[component.id],
    ...component,
  };
  return {
    ...components[component.id],
    ...component,
  };
};

// remove the component from the map
export const removeComponent = (componentId) => {
  delete components[componentId];
};

export const enableComponentId = (componentId) =>
  updateComponent({
    id: componentId,
    enabled: true,
  });

export const disableComponentId = (componentId) =>
  updateComponent({
    id: componentId,
    enabled: false,
  });

// get a component of type on a given entity
export const getComponent = (entityId, type) => {
  return Object.values(components).find(
    (component) => component.entityId == entityId && component.type == type,
  );
};

// gets an array of components of type on a given entity
export const getComponents = (entityId, type) => {
  return Object.values(components).filter(
    (component) => component.entityId == entityId && component.type == type,
  );
};

export const componentTypes = {
  TRANSFORM: 'Transform',
  IMAGE: 'Image',
  RECT: 'Rect',
  DRAGGABLE: 'Draggable',
  HOVER: 'Hover',
  FIT_CANVAS: 'Fit-Canvas',
  TEXT: 'Text',
  IMAGE_WITH_CAPTION: 'Image-With-Caption',
  DIALOGUE_WITH_IMAGE: 'Dialogue-With-Image',
  STATS: 'Stats',
  HOTKEY: 'Hotkey',
};
