
/**
 * @description Register event function
 */
export function registerEvent(wavesurfer, event, func) {
  wavesurfer.on(event, func);
}

/**
 * @description Pass audio data to wavesurfer
 */
export function loadAudio(wavesurfer, audioFileOrElt, audioPeaks) {
  if (audioFileOrElt instanceof window.HTMLElement) {
    // media element
    wavesurfer.loadMediaElement(audioFileOrElt, audioPeaks);
  } else if (typeof audioFileOrElt === 'string') {
    // bog-standard string is handled by load method and ajax call
    wavesurfer.load(audioFileOrElt, audioPeaks);
  } else if (
    audioFileOrElt instanceof window.Blob ||
    audioFileOrElt instanceof window.File
  ) {
    // blob or file is loaded with loadBlob method
    wavesurfer.loadBlob(audioFileOrElt, audioPeaks);
  } else {
    throw new Error(`Wavesurfer._loadAudio expects prop audioFile
        to be either HTMLElement, string or file/blob`);
  }
}

/**
 * @description Capitalise the first letter of a string
 */
export function capitalizeFirstLetter(string) {
  return string
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * @description Throws an error if the prop is defined and not an integer or not positive
 */
export function positiveIntegerProptype(props, propName, componentName) {
  const n = props[propName];
  if (
    n !== undefined &&
    (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)
  ) {
    return new Error(`Invalid ${propName} supplied to ${componentName},
      expected a positive integer`);
  }

  return null;
}

/**
 * @description Receives seconds and transforms this to the position as a float 0-1
 */
function _secToPos(duration, sec) {
  return 1 / duration * sec;
}

/**
 * @description Seek to the position (in seconds)
 */
export function seekTo(wavesurfer, props) {
  const duration = wavesurfer.getDuration() || props.duration;
  const pos = _secToPos(duration, props.pos);

  if (pos && !isNaN(pos)) {
    if (props.autoCenter) {
      wavesurfer.seekAndCenter(pos);
    } else {
      wavesurfer.seekTo(pos);
    }
  } else if (duration && props.pos) {
    wavesurfer.seekTo(props.pos);
  }
}

/**
 * @description load a media element selector or HTML element
 *              if selector, get the HTML element for it
 *              and pass to _loadAudio
 */
export function loadMediaElt(wavesurfer, selectorOrElt, audioPeaks) {
  if (selectorOrElt instanceof window.HTMLElement) {
    loadAudio(wavesurfer, selectorOrElt, audioPeaks);
  } else {
    if (!window.document.querySelector(selectorOrElt)) {
      throw new Error('Media Element not found!');
    }

    loadAudio(wavesurfer, window.document.querySelector(selectorOrElt), audioPeaks);
  }
}
