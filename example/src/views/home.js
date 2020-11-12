import React from 'react';
import BasicExample from '../components/BasicExample';
import MicrophoneExample from '../components/MicrophoneExample';
import RegionsExample from '../components/RegionsExample';
import TimelineExample from '../components/TimelineExample';
import LargeFilePeaksExample from '../components/LargeFilePeaksExample';
import MediaElementWebAudioExample from '../components/MediaElementWebAudioExample';
import GetPeaksExample from '../components/GetPeaksExample';
import SpectrogramExample from '../components/SpectrogramExample';

export default class Home extends React.Component {
render () {
    return (
      <div className={'container'}>
        <div className={'header'}>Basic Example</div>
        <BasicExample />
        <div className={'header'}>
          Microphone Example
        </div>
        <MicrophoneExample />
        <div className={'header'}>
          Regions Example
        </div>
        <RegionsExample />
        <div className={'header'}>
          Timeline Example
        </div>
        <TimelineExample />
        <div className={'header'}>
          Large File Example
          <div className={'subheader'}>This uses pre-generated PCM data to load a 117MB file quickly</div>
        </div>
        <LargeFilePeaksExample />
        <div className={'header'}>
          MediaElementWebAudio Backend Example
          <div className={'subheader'}>This uses the backend of MediaElementWebAudio for handling larger files</div>
        </div>
        <MediaElementWebAudioExample />
        <div className={'header'}>
          Fetch Peaks Example
          <div className={'subheader'}>After the audio is loaded and ready, the PCM array will appear</div>
        </div>
        <GetPeaksExample />
        <div className={'header'}>
          Spectrogram Example
          <div className={'subheader'}>A visual representation of the spectrum of frequencies of a signal as it varies with time</div>
        </div>
        <SpectrogramExample />
      </div>
    )
  }
}
