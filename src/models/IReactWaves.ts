import { CSSProperties } from 'react';

export interface IReactWaves {
  style?: CSSProperties;
  className?: string;
  playing?: boolean;
  pos?: number;
  audioFile?: (props: object, propName: string, componentName: string) => void;
  mediaElt?: string | HTMLElement;
  audioPeaks?: number[];
  volume?: number;
  zoom?: number;
  onPosChange?: () => void;
  options?: {
    audioRate?: number;
    audioContext?: object;
    audioScriptProcessor?: object;
    autoCenter?: boolean;
    backend?: "WebAudio" | "MediaElement" | "MediaElementWebAudio";
    barGap?: number;
    barHeight?: number;
    barRadius?: number;
    barWidth?: (
      props: object,
      propName: string,
      componentName: string
    ) => void;
    closeAudioContext?: boolean;
    cursorColor?: string;
    cursorWidth?: number;
    fillParent?: boolean;
    forceDecode?: boolean;
    height?: number;
    hideScrollbar?: boolean;
    interact?: boolean;
    loopSelection?: boolean;
    maxCanvasWidth?: number;
    mediaControls?: boolean;
    mediaType?: "audio" | "video";
    minPxPerSec?: number;
    normalize?: boolean;
    partialRender?: boolean;
    pixelRatio?: number;
    progressColor?: string;
    removeMediaElementOnDestroy?: boolean;
    renderer?: object;
    responsive?: boolean;
    scrollParent?: boolean;
    skipLength?: number;
    splitChannels?: boolean;
    waveColor?: string | CanvasGradient;
    xhr?: object;
  };
  spectrogramOptions?: object;
  timelineOptions?: object;
}
