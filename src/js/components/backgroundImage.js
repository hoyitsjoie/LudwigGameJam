import { addFitCanvas } from './fitCanvas.js';
import { addImage } from './image.js';

export const addBackgroundImage = (entityId, src) => {
  addImage(entityId, src, () => {
    addFitCanvas(entityId, 1);
  });
};
