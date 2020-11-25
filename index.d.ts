import { CSSProperties, ReactElement } from "react";

export type Region = {
  id?: string;
  start?: number;
  end?: number;
  loop?: boolean;
  drag?: boolean;
  resize?: boolean;
  color?: string;
};

export type RegionProps = {
  regions: Region[];
};

export declare function Regions(props: RegionProps): ReactElement | null;

export type ReactWavesProps = {
  style?: CSSProperties;
  className?: string;
  playing?: boolean;
  pos?: number;
  audioFile?: File | Blob | string;
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
    barWidth?: (props: object, propName: string, componentName: string) => void;
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
  children?: ReactNode;
};

declare function ReactWaves(props: ReactWavesProps): ReactElement;

export default ReactWaves;
