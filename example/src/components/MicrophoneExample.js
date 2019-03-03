import React from 'react';
import ReactWaves from '@dschoon/react-waves';


export default class MicrophoneExample extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      micRecord: false,
      micInstance: {}
    };

    this.mediaRecorder = {};
    this.audioChunks = [];

    this.micCallback = this.micCallback.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleAudioOutput = this.handleAudioOutput.bind(this);
    this.toggleMic = this.toggleMic.bind(this);
    this.startMic = this.startMic.bind(this);
    this.stopMic = this.stopMic.bind(this);
  }

  micCallback({ micInstance, stream }) {
    if (micInstance) {
      this.setState({ micInstance });
    } else if (stream) {
      this.handleStream(stream);
    }
  }

  handleStream(stream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.start();

    this.mediaRecorder.addEventListener("dataavailable", event => {
      this.audioChunks.push(event.data);
    });
  }

  handleAudioOutput() {
    return new Promise(resolve => {
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        const play = () => {
          audio.play();
        };

        resolve({ audioBlob, audioUrl, play });
      });

      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
      }
    });
  }

  toggleMic() {
    this.state.micRecord ? this.stopMic() : this.startMic();
  }

  startMic() {
    if (!this.state.micInstance.active) {
      this.state.micInstance.start();
      this.setState({micRecord: true});
    }
  }

  stopMic() {
    if (this.state.micInstance.active) {
      this.state.micInstance.stop();

      this.handleAudioOutput().then(({audioBlob, audioUrl}) => {
        this.setState({micRecord: false, audio: audioUrl});
      });
    }
  }

  render () {
    return (
      <div className={'container example'}>
        <div className="mic button" onClick={this.toggleMic}>
          { !this.state.micRecord ? '⏺' : '⏹' }
        </div>
        <ReactWaves
          className={'react-waves'}
          options={{
            barHeight: 4,
            barWidth: 2,
            cursorWidth: 0,
            height: 200,
            hideScrollbar: true,
            progressColor: '#EC407A',
            responsive: true,
            waveColor: '#D1D6DA',
          }}
          playing={this.state.micRecord}
          volume={1}
          zoom={1}
          micCallback={this.micCallback}
        />
      </div>
    )
  }
}
