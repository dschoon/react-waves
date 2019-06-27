import React from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';

export default class GetPeaksExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioPeaks: [],
    };
  }

  onWaveformReady = ({ wavesurfer }) => {
    let exportPCM = wavesurfer.exportPCM(null, 1000, true, null);
    if (exportPCM) {
      this.setState({ audioPeaks: exportPCM });
    }
  };

  clickToCopy = () => {
    let textArea = document.createElement('textarea');
    textArea.value = this.state.audioPeaks;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  render() {
    return (
      <div>
        <div className={'container example'} style={{ display: 'none' }}>
          <div className="play button" onClick={() => { this.setState({ playing: !this.state.playing }) }}>
            { !this.state.playing ? '▶️' : '⏹' }
          </div>
          <ReactWaves
            audioFile={africa}
            className='react-waves'
            options={{ backend: 'MediaElement' }}
            onWaveformReady={this.onWaveformReady}
          />
        </div>
        <div>
          { this.state.audioPeaks.length ?
            <div>
              <div id='copy-btn'><button onClick={this.clickToCopy}>Copy</button></div>
              <div id='audioPeaks'>
                {this.state.audioPeaks}
              </div>
            </div>
            : <div className='loader' />
          }
        </div>
      </div>
    )
  }
}
