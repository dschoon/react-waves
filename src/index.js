import React from 'react'
import PropTypes from 'prop-types';

import Waveform from './components/Waveform'
import { positiveIntegerProptype } from './utils/wavesurfer';
import styles from './styles.scss'


export default class ReactWaves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: this.props.playing,
      pos: this.props.pos
    };

    this.onPosChange = this.onPosChange.bind(this);
  }

  onPosChange(e) {
    const pos = e.originalArgs && e.originalArgs[0];

    if (this.props.onPosChange) {
      this.props.onPosChange(pos);
    } else {
      this.setState({
        playing: !this.state.playing,
        pos
      });
    }
  }

  render() {
    return (
      <div className={ styles.reactWaves + (this.props.className ? ' ' + this.props.className : '') }>
        <Waveform
          {...this.props}
          pos={this.state.pos}
          onPosChange={this.onPosChange}
          playing={this.state.playing}
        />
      </div>
    )
  }
}

Waveform.propTypes = {
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
};

Waveform.defaultProps = {
  audioFile: '',
  volume: 1,
  zoom: 20,
  options: {
    barHeight: 2,
    barWidth: 3,
    cursorWidth: 0,
    height: 200,
    hideScrollbar: true,
    progressColor: '#44BDB2',
    responsive: true,
    waveColor: '#D1D6DA',
  },
  pos: 0,
  playing: false
};
