import React from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';


export default class BasicExample extends React.Component {
  state = {
    playing: false
  };

  render () {
    return (
      <div className={'container example'}>
        <div className="play button" onClick={() => { this.setState({ playing: !this.state.playing }) }}>
          { !this.state.playing ? '▶️' : '⏹' }
        </div>
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
          playing={this.state.playing}
        />
      </div>
    )
  }
}
