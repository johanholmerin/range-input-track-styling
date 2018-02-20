# Range input track styling

Uses [CSS Paint API](https://caniuse.com/#feat=css-paint-api)

## Usage

```html
  <style>
    input[type="range"] {
      -webkit-appearance: none;
      --track-color: #dadada;
      --track-progress-color: #4184f4;
      --track-height: 2px;
    }
  </style>

  <input type="range">

  <script type="module">
    import register from 'range-input-track-styling';

    register(document.querySelector('input[type="range"]'));
  </script>
```
