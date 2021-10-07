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
    loop?: boolean;
    hideTitle?: boolean;
    iframeUrl?: string;
    token?: string;
    showSubtitles?: boolean;
};
export declare class PlayerSdk {
    private static DEFAULT_IFRAME_URL;
    private iframe;
    private playerReady;
    private onceReadyCallbacks;
    private userEventListeners;
    private sdkPlayerId;
    private sdkOrigin;
    private playerOrigin;
    private postMessageCallbacks;
    private iframeUrl;
    static nextSdkPlayerId: number;
    constructor(targetSelector: string, userOptions?: SdkOptions);
    loadConfig(options: SdkOptions): void;
    play(): void;
    hideControls(): void;
    showControls(): void;
    hideSubtitles(): void;
    showSubtitles(): void;
    pause(): void;
    mute(): void;
    unmute(): void;
    seek(time: number): void;
    setCurrentTime(time: number): void;
    setVolume(volume: number): void;
    setLoop(loop: boolean): void;
    setPlaybackRate(rate: number): void;
    setTheme(theme: PlayerTheme): void;
    getPaused(callback?: (paused: boolean) => void): Promise<boolean>;
    getMuted(callback?: (muted: boolean) => void): Promise<boolean>;
    getDuration(callback?: (duration: number) => void): Promise<number>;
    getCurrentTime(callback?: (currentTime: number) => void): Promise<number>;
    getPlaybackRate(callback?: (rate: number) => void): Promise<number>;
    getVolume(callback?: (volume: number) => void): Promise<number>;
    getLoop(callback?: (loop: boolean) => void): Promise<boolean>;
    addEventListener(event: string, callback: () => void): void;
    destroy(): void;
    private createNewPlayer;
    private buildPlayerUrl;
    private bindExistingPlayer;
    private addParametersInIframeHash;
    private urlParametersFromOptions;
    private onEvent;
    private onReady;
    private postMessage;
    private makeId;
    private createIframe;
    private setIframeSrc;
}
export {};
