import React from 'react';
import ReactWaves, { Regions } from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';

export default class RegionsExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wavesurfer: null,
      playing: false,
      pos: 0,
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

  onLoading = ({ wavesurfer, originalArgs=[] }) => {
    this.setState({ loaded: originalArgs[0] === 100, wavesurfer });
  };

  onPosChange = (pos, wavesurfer) => {
    if (pos !== this.state.pos) {
      this.setState({ pos, wavesurfer });
    }
  };

  secondsToPosition = (sec) => {
    return 1 / this.state.wavesurfer.getDuration() * sec;
  };

  zoom = (direction) => {
    const { wavesurfer } = this.state;
    const currentZoom = wavesurfer.params.minPxPerSec;

    if (direction === 'in') {
      wavesurfer.zoom(currentZoom + 1);
    } else if (direction === 'out' && currentZoom > 1) {
      wavesurfer.zoom(currentZoom - 1);
    }
  };

  removeRegion = (name) => {
    if (this.state.wavesurfer.regions.list[name]) {
      this.state.wavesurfer.regions.list[name].remove();
    }
  };
  resetRegions = () => {
    // Only reset region "One" if it does not exist
    if (!this.state.wavesurfer.regions.list.One) {
      this.state.wavesurfer.addRegion({ id: 'One', start: 40, end: 60, color: 'rgba(100, 149, 240, 0.3)' });
    }
    // Only reset region "Two" if it does not exist
    if (!this.state.wavesurfer.regions.list.Two) {
      this.state.wavesurfer.addRegion({ id: 'Two', start: 75, end: 100, color: 'rgba(100, 149, 240, 0.3)' });
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
    setTimeout(() => {
      this.state.wavesurfer.seekTo(this.secondsToPosition(e.originalArgs[0].start));
    }, 50);
  };

  handleRegionDone = () => {
    this.setState({ playing: false })
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
            barGap: 2,
            barWidth: 1.8,
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
          pos={this.state.pos}
          playing={this.state.playing}
          onPosChange={this.onPosChange}
          onLoading={this.onLoading}
        >
          <Regions
            onSingleRegionUpdate={this.handleSingleRegionUpdate}
            onSingleRegionIn={() => {}}
            onSingleRegionOut={() => {}}
            onSingleRegionRemove={() => {}}
            onSingleRegionClick={() => {}}
            onSingleRegionOver={() => {}}
            onSingleRegionLeave={() => {}}
            onRegionClick={this.handleRegionClick}
            onRegionIn={() => {}}
            onRegionOut={this.handleRegionDone}
            onRegionRemove={() => {}}
            onRegionDblclick={() => {}}
            onRegionOver={() => {}}
            onRegionLeave={() => {}}
            regions={this.state.regions}
          />
        </ReactWaves>
        <div className='zoom-buttons'>
          <div className="zoom-in button" onClick={this.zoom.bind(this, 'in')}>
            ➕️
          </div>
          <div className="zoom-out button" onClick={this.zoom.bind(this, 'out')}>
            ➖️
          </div>
          <div className="remove-region-1 button" onClick={this.removeRegion.bind(this, 'One')}>
            🛑 <span>1</span>
          </div>
          <div className="remove-region-2 button" onClick={this.removeRegion.bind(this, 'Two')}>
            🛑 <span>2</span>
          </div>
          <div className="reset button" onClick={this.resetRegions}>
            Reset
          </div>
        </div>
      </div>
    )
  }
}
