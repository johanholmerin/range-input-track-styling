CSS.paintWorklet.addModule(URL.createObjectURL(new Blob([`
  registerPaint('input-range-track', class {

  static get inputProperties() {
    return [
      '--track-color',
      '--track-progress-color',
      '--ratio',
      '--track-height'
    ];
  }

  paint(ctx, geom, props) {
    const color = props.get('--track-color').toString();
    const progressColor = props.get('--track-progress-color').toString();
    const height = parseFloat(
      props.get('--track-height').toString() || geom.height
    );
    const ratio = parseFloat(props.get('--ratio').toString());

    if (color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.rect(0, (geom.height - height) / 2, geom.width, height);
      ctx.fill();
      ctx.closePath();
    }

    if (progressColor) {
      ctx.beginPath();
      ctx.fillStyle = progressColor;
      ctx.rect(0, (geom.height - height) / 2, geom.width * ratio, height);
      ctx.fill();
      ctx.closePath();
    }
  }

  });
`], { type: 'text/javascript' })));

function setRatio(el) {
  const value = parseFloat(el.value);
  const max = el.max === '' ? 100 : parseFloat(el.max);
  const min = el.min === '' ? 0 : parseFloat(el.min);

  el.style.setProperty('--ratio', (value - min) / (max - min));
}

export default input => {
  input.addEventListener('input', event => setRatio(event.currentTarget));
  setRatio(input);
  input.style.setProperty('background-image', 'paint(input-range-track)');
}
