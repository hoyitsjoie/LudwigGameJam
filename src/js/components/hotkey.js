import { entityIsActive } from './entity.js';
import { addComponent, componentTypes, newComponent } from './component.js';
export const addHotkey = (entityId, hotkeys) => {
  const component = newComponent(entityId, componentTypes.HOTKEY);

  component.init = () => {
    if (!entityIsActive(entityId)) return;
    // add an event listener for keydown
    document.addEventListener('keydown', (event) => {
      // check if it is the correct key
      console.log(event.key, hotkeys[event.key]);
      if (hotkeys[event.key]) hotkeys[event.key]();
    });
  };

  return addComponent(component);
};
