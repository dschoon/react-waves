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
          start: 40,
          end: 60,
          color: 'rgba(100, 149, 240, 0.3)',

          /*
           *  Option	Type	    Default	                Description
           *  ------  ----      -------                 ------------
           *  id	    string	  random	                The id of the region.
           *  start	  float	    0	                      The start position of the region (in seconds).
           *  end	    float	    0	                      The end position of the region (in seconds).
           *  loop	  boolean	  false	                  Whether to loop the region when played back.
           *  drag	  boolean	  true	                  Allow/dissallow dragging the region.
           *  resize	boolean	  true	                  Allow/dissallow resizing the region.
           *  color	  string	  "rgba(0, 0, 0, 0.1)"	  HTML color code.
           */

        },
        Two: {
          id: 'Two',
          start: 75,
          end: 100,
          color: 'rgba(100, 149, 240, 0.3)',
        }
      }
    };
  }

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
