
export const EVENTS = [
  'audioprocess',
  'destroy',
  'error',
  'finish',
  'interaction',
  'loading',
  'mute',
  'pause',
  'play',
  'ready',
  'scroll',
  'seek',
  'volume',
  'waveform-ready',
  'zoom',
];

export const EVENT = {
  // Fires continuously as the audio plays. Also fires on seeking.
  AUDIO_PROCESS: EVENTS[0],
  // When instance is destroyed.
  DESTROY: EVENTS[1],
  // Occurs on error. Callback will receive (string) error message.
  ERROR: EVENTS[2],
  // When it finishes playing.
  FINISH: EVENTS[3],
  // When there's interaction with the waveform.
  INTERACTION: EVENTS[4],
  // Fires continuously when loading via XHR or drag'n'drop. Callback will receive (integer) loading progress in percents [0..100] and (object) event target.
  LOADING: EVENTS[5],
  // On mute change. Callback will receive (boolean) new mute status.
  MUTE: EVENTS[6],
  // When audio is paused.
  PAUSE: EVENTS[7],
  // When playback starts.
  PLAY: EVENTS[8],
  // When audio is loaded, decoded and the waveform drawn. This fires before the waveform is drawn when using MediaElement, see waveform-ready.
  READY: EVENTS[9],
  // When the scrollbar is moved. Callback will receive a ScrollEvent object.
  SCROLL: EVENTS[10],
  // On seeking. Callback will receive (float) progress [0..1].
  SEEK: EVENTS[11],
  // On volume change. Callback will receive (integer) new volume.
  VOLUME: EVENTS[12],
  // Fires after the waveform is drawn when using the MediaElement backend. If you're using the WebAudio backend, you can use ready.
  WAVEFORM_READY: EVENTS[13],
  // On zooming. Callback will receive (integer) minPxPerSec.
  ZOOM: EVENTS[14],
};

export const REGIONS_EVENTS = [
  'region-in',
  'region-out',
  'region-removed',
  'region-updated',
  'region-mouseenter',
  'region-mouseleave',
  'region-click',
  'region-dblclick',
  'region-update-end',
  'region-play',
];

export const REGION_EVENTS = [
  'in',
  'out',
  'remove',
  'update',
  'update-end',
  'click',
  'dbclick',
  'over',
  'leave'
];
