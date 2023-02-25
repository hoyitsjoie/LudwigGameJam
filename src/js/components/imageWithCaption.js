import { vec2 } from '../vector.js';
import { addImage } from './image.js';
import { addText } from './text.js';

export const addImageWithCaption = (entityId, src, textValue) => {
  const imageComponent = addImage(entityId, src, () => {
    addText(entityId, textValue, 'italic 16px Arial', 'black', 'transparent', {
      offset: vec2(0, imageComponent.image.height),
      justify: 'center',
    });
  });
};
