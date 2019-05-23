import React from 'react';
import BasicExample from '../components/BasicExample';
import MicrophoneExample from '../components/MicrophoneExample';
import RegionsExample from '../components/RegionsExample';
import LargeFilePeaksExample from '../components/LargeFilePeaksExample';
import GetPeaksExample from '../components/GetPeaksExample';

export default class Home extends React.Component {
render () {
    return (
      <div className={'container'}>
        <div className={'header'}>Basic Example</div>
        <BasicExample />
        <div className={'header'}>
          Microphone Example
          <div className={'subheader'}>(Work in progress)</div>
        </div>
        <MicrophoneExample />
        <div className={'header'}>
          Regions Example
          <div className={'subheader'}>(Work in progress)</div>
        </div>
        <RegionsExample />
        <div className={'header'}>
          Large File Example
          <div className={'subheader'}>This uses pre-generated PCM data to load a 117MB file quickly</div>
        </div>
        <LargeFilePeaksExample />
        <div className={'header'}>
          Fetch Peaks Example
          <div className={'subheader'}>After the audio is loaded and ready, the PCM array will appear</div>
        </div>
        <GetPeaksExample />
      </div>
    )
  }
}
