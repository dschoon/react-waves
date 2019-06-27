import React from 'react';
import PropTypes from 'prop-types';

import Waveform from './components/Waveform';
import { positiveIntegerProptype } from './utils/wavesurfer';

import styles from './styles.scss';


export default class ReactWaves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: this.props.pos,
      duration: this.props.duration,
    };
  }

  componentWillReceiveProps(nextProps) {
     if (this.props.audioFile && nextProps.audioFile) {
       this.setState({
         pos: nextProps.pos,
         duration: nextProps.duration,
       })
     }
  }

  onPosChange = (e) => {
    const pos = e.originalArgs && e.originalArgs[0];
    const duration = e.wavesurfer && e.wavesurfer.getDuration();

    if (this.props.onPosChange) {
      this.props.onPosChange(pos, e.wavesurfer);
    } else if (pos && pos !== this.state.pos) {
      this.setState({
        pos,
        duration
      });
    }
  };

  render() {
    return (
      <div className={ styles.reactWaves + (this.props.className ? ' ' + this.props.className : '') }>
        <Waveform
          {...this.props}
          pos={this.state.pos}
          duration={this.state.duration}
          onPosChange={this.onPosChange}
          playing={this.props.playing}
        />
      </div>
    )
  }
}

ReactWaves.propTypes = {
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

ReactWaves.defaultProps = {
  audioFile: '',
  volume: 1,
  zoom: 1,
  options: {
    barGap: 0,
    barHeight: 2,
    cursorWidth: 0,
    height: 200,
    hideScrollbar: true,
    progressColor: '#EC407A',
    responsive: true,
    waveColor: '#D1D6DA',
  },
  pos: 0,
  playing: false
};


export * from './components/Plugins/regions';
