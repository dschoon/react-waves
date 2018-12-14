# ReactWaves

React component wrapper for [Wavesurfer v2](http://wavesurfer-js.org)

[![NPM](https://img.shields.io/npm/v/@dschoon/react-waves.svg)](https://www.npmjs.com/package/@dschoon/react-waves) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![CircleCI](https://circleci.com/gh/dschoon/react-waves.svg?style=svg)](https://circleci.com/gh/dschoon/react-waves)


Welcome! This component is still a work in progress, and is heavily based off the previous work done in [react-wavesurfer](https://github.com/mspae/react-wavesurfer) by [@mspae](https://github.com/mspae) (and [others]((https://github.com/mspae/react-wavesurfer/graphs/contributors))). After wavesurfer-js released version 2, and the react-wavesurfer projected became unmaintained, I decided that it was safer to start my own version that I had better control over.

Please report any [issues](https://github.com/dschoon/react-waves/issues) you encounter and I will try my best to get them fixed. 


----

![ReactWaves](example/public/react-waves.jpg)

**[Demo](https://dschoon.github.io/react-waves/)** -- **[Example Code](https://github.com/dschoon/react-waves/tree/master/example)**
 

## Install

```bash
npm install --save react-waves
```

## Example

```jsx
import React from 'react'
import ReactWaves from 'react-waves'

import africa from './audio/africa.mp3';

export default class App extends React.Component {
  render () {
    return (
      <div className={'container'}>
        <ReactWaves
          audioFile={africa}
          className={'react-waves'}
          options={{
            barHeight: 2,
            cursorWidth: 0,
            height: 200,
            hideScrollbar: true,
            progressColor: '#EC407A',
            responsive: true,
            waveColor: '#D1D6DA',
          }}
          volume={1}
          zoom={1}
        />
      </div>
    )
  }
}

```

## Available Props

```jsx
props = {
  playing: PropTypes.bool,
  pos: PropTypes.number,
  audioFile: (props, propName, componentName) => {
    const prop = props[propName];
    if (
      prop &&
      typeof prop !== 'string' &&
      !(prop instanceof window.Blob) &&
      !(prop instanceof window.File)
    ) {
      return new Error(`Invalid ${propName} supplied to ${componentName}
        expected either string or file/blob`);
    }

    return null;
  },

  mediaElt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(window.HTMLElement)
  ]),
  audioPeaks: PropTypes.array,
  volume: PropTypes.number,
  zoom: PropTypes.number,
  onPosChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  options: PropTypes.shape({
    audioRate: PropTypes.number,
    audioContext: PropTypes.object,
    audioScriptProcessor: PropTypes.object,
    autoCenter: PropTypes.bool,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barGap: positiveIntegerProptype,
    barHeight: positiveIntegerProptype,
    barWidth: (props, propName, componentName) => {
      const prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          expected either undefined or number`);
      }

      return null;
    },
    closeAudioContext: PropTypes.bool,
    cursorColor: PropTypes.string,
    cursorWidth: positiveIntegerProptype,
    fillParent: PropTypes.bool,
    forceDecode: PropTypes.bool,
    height: positiveIntegerProptype,
    hideScrollbar: PropTypes.bool,
    interact: PropTypes.bool,
    loopSelection: PropTypes.bool,
    maxCanvasWidth: positiveIntegerProptype,
    mediaControls: PropTypes.bool,
    mediaType: PropTypes.oneOf(['audio', 'video']),
    minPxPerSec: positiveIntegerProptype,
    normalize: PropTypes.bool,
    partialRender: PropTypes.bool,
    pixelRatio: PropTypes.number,
    plugins: PropTypes.array,
    progressColor: PropTypes.string,
    removeMediaElementOnDestroy: PropTypes.bool,
    renderer: PropTypes.object,
    responsive: PropTypes.bool,
    scrollParent: PropTypes.bool,
    skipLength: PropTypes.number,
    splitChannels: PropTypes.bool,
    waveColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(window.CanvasGradient)
    ]),
    xhr: PropTypes.object,
  })
}

```

## License

MIT © [Dan Schoonmaker](https://danielschoonmaker.com) [(github)](https://github.com/dschoon)
