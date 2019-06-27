import React from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';


export default class SkipExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wavesurfer: null,
      playing: false,
      pos: 0,
    };
  }

  onPosChange = (pos, wavesurfer) => {
    if (pos !== this.state.pos) {
      this.setState({ pos, wavesurfer });
    }
  };

  skipAhead = () => {
    this.state.wavesurfer.seekTo(this.secondsToPosition(this.state.pos + 10));
  };

  secondsToPosition = (sec) => {
    return 1 / this.state.wavesurfer.getDuration() * sec;
  };

  render() {
    return (
      <div className={'container example'}>
        <div className="play button"
             onClick={() => { this.setState({ playing: !this.state.playing }) }}
             style={{left: '-99px'}}
        >
          { !this.state.playing ? '▶️' : '⏹' }
        </div>
        <div className="skip button"
             onClick={this.state.wavesurfer && this.skipAhead}
             style={
               this.state.wavesurfer ? {} : {opacity: '.4', cursor: 'default'}
             }
        >
          { '⏩' }
        </div>
        <ReactWaves
          audioFile={africa}
          className='react-waves'
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
          playing={this.state.playing}
          pos={this.state.pos}
          onPosChange={this.onPosChange}
        />
      </div>
    )
  }
}
