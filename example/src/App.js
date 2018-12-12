import React from 'react'
import ReactWaves from 'react-waves'

import africa from './audio/africa.mp3';


export default class App extends React.Component {
  render () {
    return (
      <div className={'container'}>
        <ReactWaves
          audioFile={africa}
          playing={true}
          onPosChange={this.onPosChange}
        />
      </div>
    )
  }
}
