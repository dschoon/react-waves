import React from 'react'
import ReactWaves from 'react-waves'

import africa from './audio/africa.mp3';

export default class App extends React.Component {
  render () {
    return (
      <div className={'container'}>
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
        />
      </div>
    )
  }
}
