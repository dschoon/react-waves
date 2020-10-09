import React from "react";
import WaveSurfer from "wavesurfer.js";
import Microphone from "wavesurfer.js/src/plugin/microphone";
import Regions from "wavesurfer.js/src/plugin/regions";
import Spectrogram from "wavesurfer.js/src/plugin/spectrogram";
import Timeline from "../Plugins/timeline";

import {
  registerEvent,
  loadAudio,
  loadMediaElt,
  capitalizeFirstLetter,
  seekTo,
} from "../../utils/wavesurfer";
import { EVENT, EVENTS } from "../../models/Events";

export default class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };

    if (typeof WaveSurfer === undefined) {
      throw new Error("WaveSurfer is undefined!");
    }
  }

  componentDidMount() {
    let { options, spectrogramOptions, timelineOptions } = this.props;

    options.plugins = [Regions.create()];

    if (this.props.micCallback) {
      options.plugins.push(Microphone.create());
    }

    if (spectrogramOptions) {
      options.plugins.push(
        Spectrogram.create({
          container: spectrogramOptions.container,
          colorMap: spectrogramOptions.colorMap,
          pixelRatio: spectrogramOptions.pixelRatio,
          fftSamples: spectrogramOptions.fftSamples,
          noverlap: spectrogramOptions.noverlap,
          windowFunc: spectrogramOptions.windowFunc,
          alpha: spectrogramOptions.alpha,
          deferInit: spectrogramOptions.deferInit,
          labels: spectrogramOptions.labels,
        })
      );
    }

    if (timelineOptions) {
      options.plugins.push(
        Timeline.create({
          container: timelineOptions.container,
          pixelRatio: timelineOptions.pixelRatio,
          zoomDebounce: timelineOptions.zoomDebounce,
          height: timelineOptions.height || 50,
          duration: timelineOptions.duration,
          notchPercentHeight: timelineOptions.notchPercentHeight,
          timeInterval: timelineOptions.timeInterval,
          primaryLabelInterval: timelineOptions.primaryLabelInterval,
          secondaryLabelInterval: timelineOptions.secondaryLabelInterval,
          offset: timelineOptions.offset,
          primaryColor: timelineOptions.primaryColor,
          fontSize: timelineOptions.fontSize,
          fontFamily: timelineOptions.fontFamily,
          primaryFontColor: timelineOptions.primaryFontColor,
          labelPadding: timelineOptions.labelPadding,
          unlabeledNotchColor: timelineOptions.unlabeledNotchColor,
        })
      );
    }

    this._wavesurfer = WaveSurfer.create({
      ...options,
      container: this.wavesurferEl,
    });

    if (this.props.micCallback) {
      this._wavesurfer.microphone.on("deviceReady", (stream) => {
        this.props.micCallback({ stream });
      });
      this._wavesurfer.microphone.on("deviceError", (error) => {
        this.props.micCallback({ error });
      });

      this.props.micCallback({ micInstance: this._wavesurfer.microphone });
    }

    registerEvent(this._wavesurfer, EVENT.AUDIO_PROCESS, (pos) => {
      if (Math.ceil(pos) !== Math.ceil(this.props.pos)) {
        this.props.onPosChange({
          wavesurfer: this._wavesurfer,
          originalArgs: [pos],
        });
      }
    });

    registerEvent(this._wavesurfer, EVENT.SEEK, (pos) => {
      let duration = this._wavesurfer.getDuration();

      if (Math.ceil(duration * pos) !== Math.ceil(this.props.pos)) {
        this.props.onPosChange({
          wavesurfer: this._wavesurfer,
          originalArgs: [pos],
        });
      }
    });

    // file was loaded, wave was drawn
    registerEvent(this._wavesurfer, EVENT.READY, () => {
      this.setState({ isReady: true });

      if (!this.props.micCallback) {
        // set initial position
        seekTo(this._wavesurfer, this.props);
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

    EVENTS.forEach((event) => {
      const capLetter = capitalizeFirstLetter(event);
      const propCallback = this.props["on" + capLetter];
      if (propCallback) {
        registerEvent(this._wavesurfer, event, (...originalArgs) => {
          propCallback({
            wavesurfer: this._wavesurfer,
            originalArgs,
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
      loadMediaElt(
        this._wavesurfer,
        this.props.mediaElt,
        this.props.audioPeaks
      );
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
        loadMediaElt(
          this._wavesurfer,
          nextProps.mediaElt,
          nextProps.audioPeaks
        );
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
    // Clear buffer
    delete this._wavesurfer.backend.buffer;

    // unsubscribe all listeners
    this._wavesurfer.unAll();

    // destroy wavesurfer instance
    this._wavesurfer.destroy();
  }

  render() {
    const childrenWithProps = this.props.children
      ? React.Children.map(this.props.children, (child) =>
          React.cloneElement(child, {
            wavesurfer: this._wavesurfer,
            isReady: this.state.isReady,
          })
        )
      : false;

    return (
      <div className="waveform">
        <div
          className="wave"
          ref={(c) => {
            this.wavesurferEl = c;
          }}
        />
        {this._wavesurfer && this.state.isReady && childrenWithProps}
      </div>
    );
  }
}
