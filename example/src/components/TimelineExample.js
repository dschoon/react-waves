import React from 'react';
import ReactWaves from '@dschoon/react-waves';

import demoAudio from '../audio/demo.wav';

export default class TimelineExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wavesurfer: null,
      playing: false,
      pos: 0,
    };
  }

  onLoading = ({ wavesurfer, originalArgs=[] }) => {
    this.setState({ loaded: originalArgs[0] === 100, wavesurfer });
  };

  onPosChange = (pos, wavesurfer) => {
    if (pos !== this.state.pos) {
      this.setState({ pos, wavesurfer });
    }
  };

  defaultFormatTimeCallback(seconds, pxPerSec) {
    if (seconds / 60 > 1) {
      // calculate minutes and seconds from seconds count
      const minutes = parseInt(seconds / 60, 10);
      seconds = parseInt(seconds % 60, 10);
      // fill up seconds with zeroes
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
    }
    return Math.round(seconds * 1000) / 1000;
  }

  defaultTimeInterval(pxPerSec) {
    if (pxPerSec >= 25) {
      return 1;
    } else if (pxPerSec * 5 >= 25) {
      return 5;
    } else if (pxPerSec * 15 >= 25) {
      return 15;
    }
    return Math.ceil(0.5 / pxPerSec) * 60;
  }

  defaultPrimaryLabelInterval(pxPerSec) {
    if (pxPerSec >= 25) {
      return 10;
    } else if (pxPerSec * 5 >= 25) {
      return 6;
    } else if (pxPerSec * 15 >= 25) {
      return 4;
    }
    return 4;
  }

  defaultSecondaryLabelInterval(pxPerSec) {
    if (pxPerSec >= 25) {
      return 5;
    } else if (pxPerSec * 5 >= 25) {
      return 2;
    } else if (pxPerSec * 15 >= 25) {
      return 2;
    }
    return 2;
  }

  render () {
    return (
      <div className={'container example'}>
        <div className='play button' onClick={() => { this.setState({ playing: !this.state.playing }) }}>
          { !this.state.playing ? '▶️' : '⏹' }
        </div>
        <ReactWaves
          audioFile={demoAudio}
          options={{
            barGap: 1,
            barWidth: .8,
            barHeight: 2,
            cursorWidth: 1,
            height: 150,
            hideScrollbar: true,
            progressColor: '#EC407A',
            normalize: true,
            responsive: true,
            waveColor: '#D1D6DA',
          }}
          volume={1}
          zoom={1}
          pos={this.state.pos}
          playing={this.state.playing}
          onPosChange={this.onPosChange}
          onLoading={this.onLoading}
          timelineOptions={{
            container: '#timeline',
            height: 20,
            notchPercentHeight: 90,
            labelPadding: 5,
            unlabeledNotchColor: '#c0c0c0',
            primaryColor: '#000',
            secondaryColor: '#c0c0c0',
            primaryFontColor: '#000',
            secondaryFontColor: '#000',
            fontFamily: 'Arial',
            fontSize: 10,
            duration: null,
            zoomDebounce: false,
            formatTimeCallback: this.defaultFormatTimeCallback,
            timeInterval: this.defaultTimeInterval,
            primaryLabelInterval: this.defaultPrimaryLabelInterval,
            secondaryLabelInterval: this.defaultSecondaryLabelInterval,
            offset: 0
          }}
        />
        <div id='timeline' style={{ width: '650px', margin: '0 auto' }}/>
      </div>
    )
  }
}
