export declare type PlayerTheme = {
    text?: string;
    link?: string;
    linkHover?: string;
    trackPlayed?: string;
    trackUnplayed?: string;
    trackBackground?: string;
    backgroundTop?: string;
    backgroundBottom?: string;
    backgroundText?: string;
    linkActive?: string;
};
declare type SdkOptions = {
    id: string;
    live?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    metadata?: {
        [key: string]: string;
    };
    hideControls?: boolean;
    hidePoster?: boolean;
    chromeless?: boolean;
    loop?: boolean;
    hideTitle?: boolean;
    iframeUrl?: string;
    token?: string;
    showSubtitles?: boolean;
    playbackRate?: number;
};
declare type PlayerSdkEvent = {
    controlsdisabled: () => void;
    controlsenabled: () => void;
    ended: () => void;
    error: () => void;
    firstplay: () => void;
    fullscreenchange: () => void;
    mouseenter: () => void;
    mouseleave: () => void;
    pause: () => void;
    play: () => void;
    playerresize: () => void;
    qualitychange: (value: {
        resolution: {
            height: number;
            width: number;
        };
    }) => void;
    ratechange: () => void;
    ready: () => void;
    resize: () => void;
    seeking: () => void;
    timeupdate: (value: {
        currentTime: number;
    }) => void;
    useractive: () => void;
    userinactive: () => void;
    volumechange: (value: {
        volume: number;
    }) => void;
};
export declare type ControlName = "play" | "seekBackward" | "seekForward" | "playbackRate" | "volume" | "fullscreen" | "subtitles" | "chapters" | "pictureInPicture" | "progressBar" | "chromecast" | "download" | "more";
export declare class PlayerSdk {
    private static DEFAULT_IFRAME_URL;
    private iframe;
    private sdkInSync;
    private currentVideoReady;
    private onceSdkInSyncCallbacks;
    private onceVideoReadyCallbacks;
    private userEventListeners;
    private sdkPlayerId;
    private sdkOrigin;
    private playerOrigin;
    private postMessageCallbacks;
    private iframeUrl;
    static nextSdkPlayerId: number;
    constructor(targetSelector: string | Element, userOptions?: SdkOptions);
    loadConfig(options: SdkOptions): void;
    play(): void;
    hideControls(controls?: ControlName[]): void;
    showControls(controls?: ControlName[]): void;
    hideSubtitles(): void;
    showSubtitles(): void;
    hideTitle(): void;
    showTitle(): void;
    hidePoster(): void;
    showPoster(): void;
    pause(): void;
    mute(): void;
    unmute(): void;
    seek(time: number): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setAutoplay(autoplay: boolean): void;
    setLoop(loop: boolean): void;
    setChromeless(chromeless: boolean): void;
    setPlaybackRate(rate: number): void;
    setTheme(theme: PlayerTheme): void;
    getPaused(callback?: (paused: boolean) => void): Promise<boolean>;
    getMuted(callback?: (muted: boolean) => void): Promise<boolean>;
    getDuration(callback?: (duration: number) => void): Promise<number>;
    getCurrentTime(callback?: (currentTime: number) => void): Promise<number>;
    getPlaybackRate(callback?: (rate: number) => void): Promise<number>;
    getVolume(callback?: (volume: number) => void): Promise<number>;
    getLoop(callback?: (loop: boolean) => void): Promise<boolean>;
    getVideoSize(callback?: (size: {
        width: number;
        height: number;
    }) => void): Promise<{
        width: number;
        height: number;
    }>;
    addEventListener<K extends keyof PlayerSdkEvent>(event: K, callback: PlayerSdkEvent[K]): void;
    destroy(): void;
    private createNewPlayer;
    private buildPlayerUrl;
    private bindExistingPlayer;
    private addParametersInIframeHash;
    private urlParametersFromOptions;
    private onEvent;
    private onSdkInSync;
    private onVideoReady;
    private postMessage;
    private makeId;
    private createIframe;
    private setIframeSrc;
}
export {};
