import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Microphone from 'wavesurfer.js/src/plugin/microphone';

import {
  registerEvent,
  loadAudio,
  loadMediaElt,
  capitalizeFirstLetter,
  seekTo,
} from '../../utils/wavesurfer';
import { EVENT, EVENTS } from "../../models/Events";


export default class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };

    if (typeof WaveSurfer === undefined) {
      throw new Error('WaveSurfer is undefined!');
    }
  }

  componentDidMount() {
    let options = this.props.options;

    if (this.props.micCallback) {
      options.plugins = [
        Microphone.create()
      ];
    }

    this._wavesurfer = WaveSurfer.create({
      ...options,
      container: this.wavesurferEl
    });

    if (this.props.micCallback) {
      this._wavesurfer.microphone.on('deviceReady', (stream) => {
        this.props.micCallback({ stream });
      });
      this._wavesurfer.microphone.on('deviceError', (error) => {
        this.props.micCallback({ error });
      });

      this.props.micCallback({ micInstance: this._wavesurfer.microphone });
    }

    registerEvent(this._wavesurfer, EVENT.AUDIO_PROCESS, pos => {
      let currentTime = Math.ceil(pos);
      if (currentTime !== this.props.pos) {
        this.props.onPosChange({
          wavesurfer: this._wavesurfer,
          originalArgs: [currentTime]
        });
      }
    });

    // file was loaded, wave was drawn
    registerEvent(this._wavesurfer, EVENT.READY, () => {
      this.setState({ isReady: true });

      if (!this.props.micCallback) {
        // set initial position
        seekTo(this._wavesurfer, this.props, this.props.pos);
      }

      // set initial volume
      this._wavesurfer.setVolume(this.props.volume);

      if (this.props.playing) {
        // set initial playing state
        this._wavesurfer.play();
      }

      // set initial zoom
      this._wavesurfer.zoom(this.props.zoom);
    });

    EVENTS.forEach(event => {
      const capLetter = capitalizeFirstLetter(event);
      const propCallback = this.props['on' + capLetter];
      if (propCallback) {
        registerEvent(this._wavesurfer, event, (...originalArgs) => {
          propCallback({
            wavesurfer: this._wavesurfer,
            originalArgs
          });
        });
      }
    });

    // if audioFile prop, load file
    if (this.props.audioFile) {
      loadAudio(this._wavesurfer, this.props.audioFile, this.props.audioPeaks);
    }

    // if mediaElt prop, load media Element
    if (this.props.mediaElt) {
      loadMediaElt(this._wavesurfer, this.props.mediaElt, this.props.audioPeaks);
    }
  }

  componentWillReceiveProps(nextProps) {
    // update audioFile
    if (this.props.audioFile !== nextProps.audioFile) {
      this.setState({ isReady: false });
      loadAudio(this._wavesurfer, nextProps.audioFile, nextProps.audioPeaks);
    }

    // update mediaElt
    if (this.props.mediaElt !== nextProps.mediaElt) {
      this.setState({ isReady: false });
      loadMediaElt(this._wavesurfer, nextProps.mediaElt, nextProps.audioPeaks);
    }

    // update peaks
    if (this.props.audioPeaks !== nextProps.audioPeaks) {
      if (nextProps.mediaElt) {
        loadMediaElt(this._wavesurfer, nextProps.mediaElt, nextProps.audioPeaks);
      } else {
        loadAudio(this._wavesurfer, nextProps.audioFile, nextProps.audioPeaks);
      }
    }

    if (nextProps.playing) {
      this._wavesurfer.play();
    } else {
      this._wavesurfer.pause();
    }

    // update volume
    if (this.props.volume !== nextProps.volume) {
      this._wavesurfer.setVolume(nextProps.volume);
    }

    // update zoom
    if (this.props.zoom !== nextProps.zoom) {
      this._wavesurfer.zoom(nextProps.zoom);
    }

    // update audioRate
    if (this.props.options.audioRate !== nextProps.options.audioRate) {
      this._wavesurfer.setPlaybackRate(nextProps.options.audioRate);
    }
  }

  componentWillUnmount() {
    // unsubscribe all listeners
    this._wavesurfer.unAll();

    // destroy wavesurfer instance
    this._wavesurfer.destroy();
  }

  render() {
    const childrenWithProps = this.props.children
      ? React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          wavesurfer: this._wavesurfer,
          isReady: this.state.isReady
        })
      )
      : false;
    return (
      <div className='waveform'>
        <div
          className='wave'
          ref={c => {
            this.wavesurferEl = c;
          }}
        />
        {childrenWithProps}
      </div>
    );
  }
}
