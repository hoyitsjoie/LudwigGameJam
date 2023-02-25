import {
  addComponent,
  components,
  componentTypes,
  getComponent,
  newComponent,
} from './component.js';
import { ctx } from '../context.js';
import { vec2 } from '../vector.js';

export const addText = (
  entityId,
  textValue = '',
  font = '12px Grandstander, cursive',
  color = 'black',
  backgroundColor = 'transparent',
  options = {
    offset: vec2(),
    justify: 'left',
  },
) => {
  const component = newComponent(entityId, componentTypes.TEXT, {
    textValue: textValue,
    font: font,
    color: color,
    backgroundColor: backgroundColor,
    options: options,
  });

  component.render = () => {
    const {
      textValue,
      font,
      color,
      backgroundColor,
      entityId,
      options: { offset, justify },
    } = components[component.id];

    // get the component's transform
    const { position, size } = getComponent(entityId, componentTypes.TRANSFORM);

    // background rect
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(position.x, position.y, size.x, size.y);

    // set style
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';

    let { x, y } = position;
    x += offset.x;
    y += offset.y;

    const words = textValue.split(' ');
    const metrics = ctx.measureText(textValue);
    const lineHeight =
      metrics.actualBoundingBoxDescent - metrics.actualBoundingBoxAscent;

    let line = '';
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > size.x && i > 0) {
        if (justify == 'center') {
          const actualWidth = ctx.measureText(line).width;
          ctx.fillText(line, x + (size.x - actualWidth) / 2, y);
        } else {
          ctx.fillText(line, x, y);
        }
        line = word + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (justify == 'center') {
      const actualWidth = ctx.measureText(line).width;
      ctx.fillText(line, x + (size.x - actualWidth) / 2, y);
    } else {
      ctx.fillText(line, x, y);
    }
  };

  return addComponent(component);
};
