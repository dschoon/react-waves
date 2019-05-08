import React from 'react';
import ReactWaves, { Regions } from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';


export default class MicrophoneExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      activeRegion: 'One',
      regions: {
        One: {
          id: 'One',
          start: 0,
          end: 3
        },
        Two: {
          id: 'Two',
          start: 4,
          end: 5.25
        },
        Three: {
          id: 'Three',
          start: 4.75,
          end: 6.2
        }
      }
    };
  }

  regionsCallback = ({ micInstance, stream }) => {
    if (micInstance) {
      this.setState({ micInstance });
    } else if (stream) {
      this.handleStream(stream);
    }
  };

  handleSingleRegionUpdate = (e) => {
    const newState = Object.assign(this.state, {
      regions: {
        [e.region.id]: e.region
      }
    });
    this.setState(newState);
  };

  handleRegionClick = (e) => {
    this.setState({
      activeRegion: e.originalArgs[0].id
    });
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
        >
          <Regions
            onSingleRegionUpdate={this.handleSingleRegionUpdate}
            onRegionClick={this.handleRegionClick}
            regions={this.state.regions}
          />
        </ReactWaves>
      </div>
    )
  }
}
