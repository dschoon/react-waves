import React from 'react';
import BasicExample from '../components/BasicExample';
import MicrophoneExample from '../components/MicrophoneExample';
import RegionsExample from '../components/RegionsExample';

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
      </div>
    )
  }
}
