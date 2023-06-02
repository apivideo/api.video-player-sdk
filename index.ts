type UserEventListener = {
    event: string;
    callback: (data?: any) => void;
}

type PlayerEvent = {
    type: string;
    data: any;
}

export type PlayerTheme = {
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
}

type AdsOptions = {
    adTagUrl: string;
}

type SdkOptions = {
    id: string;
    live?: boolean;
    autoplay?: boolean;
    muted?: boolean;
    metadata?: {
        [key: string]: string;
    }
    hideControls?: boolean;
    hidePoster?: boolean;
    chromeless?: boolean;
    loop?: boolean;
    hideTitle?: boolean;
    iframeUrl?: string;
    token?: string;
    privateSession?: string;
    showSubtitles?: boolean;
    ads?: AdsOptions;
    playbackRate?: number;
    sequence?: {
        start: number;
        end: number;
    }
}

type PlayerSdkEvent = {
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
    qualitychange: (value: { resolution: { height: number, width: number }}) => void;
    ratechange: () => void;
    ready: () => void;
    resize: () => void;
    seeking: () => void;
    timeupdate: (value: { currentTime: number}) => void;
    useractive: () => void;
    userinactive: () => void;
    volumechange: (value: { volume: number}) => void;
}

export type ControlName = "play" | "seekBackward" | "seekForward" | "playbackRate"
    | "volume" | "fullscreen" | "subtitles" | "chapters"
    | "pictureInPicture" | "progressBar" | "chromecast" | "download" | "more";


export class PlayerSdk {
    private static DEFAULT_IFRAME_URL = "https://embed.api.video/${type}/${id}";

    private iframe: HTMLIFrameElement | null = null;
    private sdkInSync: boolean = false;
    private currentVideoReady: boolean = false;
    private onceSdkInSyncCallbacks: (() => void)[] = [];
    private onceVideoReadyCallbacks: (() => void)[] = [];
    private userEventListeners: UserEventListener[] = [];
    private sdkPlayerId: number;
    private sdkOrigin: string;
    private playerOrigin: string | null = null;
    private postMessageCallbacks: { [callbackId: string]: (arg: any) => void } = {};
    private iframeUrl: string;
    private options: SdkOptions;

    static nextSdkPlayerId: number = 1;

    constructor(targetSelector: string | Element, userOptions?: SdkOptions) {
        this.sdkPlayerId = PlayerSdk.nextSdkPlayerId++;

        this.sdkOrigin = `${window.location.protocol}//${window.location.host}`;

        const target = targetSelector instanceof Element
            ? targetSelector
            : document.querySelector(targetSelector);

        if (target == null) {
            throw new Error("No match found for selector " + targetSelector);
        }

        this.iframe = target.tagName !== "IFRAME"
            ? this.createIframe(target)
            : target as HTMLIFrameElement

        const options = userOptions || {} as SdkOptions;
        this.iframeUrl = options.iframeUrl || PlayerSdk.DEFAULT_IFRAME_URL;

        if (!this.iframe.src) {
            this.createNewPlayer(this.iframe, options)
        } else {
            this.bindExistingPlayer(this.iframe);
        }

        this.onceSdkInSyncCallbacks = [];
        this.userEventListeners = [];
        this.sdkInSync = false;
        this.currentVideoReady = false;
        this.playerOrigin = new URL(this.iframeUrl).origin;
        this.options = options;

        window.addEventListener("message", (message) => {
            if (message.origin === this.playerOrigin && parseInt(message.data?.sdkPlayerId, 10) === this.sdkPlayerId) {
                if (!!message.data.callbackId && !!this.postMessageCallbacks[message.data.callbackId]) {
                    this.postMessageCallbacks[message.data.callbackId](message.data.arg);
                } else {
                    this.onEvent(message.data);
                }
            }
        }, false);

        if(options.playbackRate) {
            this.setPlaybackRate(options.playbackRate);
        }
    }

    loadConfig(options: SdkOptions) {
        this.currentVideoReady = false;
        this.options = {
            ...this.options,
            ...options,
        };
        this.postMessage({
            message: 'loadConfig',
            url: this.buildPlayerUrl(this.options)
        });
    }

    play() {
        this.postMessage({ message: 'play' });
    }

    setVideoStyleTransform(value: string) {
        this.postMessage({ message: 'setStyleProperty', query: "video", property: "transform", value }, undefined, false);
        this.postMessage({ message: 'setStyleProperty', query: ".vjs-poster", property: "transform", value }, undefined, false);
    }

    setVideoStyleObjectFit(value: "contain" | "cover" | "fill" | "none" | "scale-down") {
        this.postMessage({ message: 'setStyleProperty', query: "video", property: "object-fit", value }, undefined, false);
        this.postMessage({ message: 'setStyleProperty', query: ".vjs-poster", property: "background-size", value }, undefined, false);
    }

    hideControls(controls?: ControlName[]) {
        if(!controls) {
            this.options.hideControls = true;
        }
        this.postMessage({ message: 'hideControls', controls }, undefined, true);
    }
    showControls(controls?: ControlName[]) {
        if(!controls) {
            this.options.hideControls = false;
        }
        this.postMessage({ message: 'showControls', controls }, undefined, true);
    }
    hideSubtitles() {
        this.options.showSubtitles = false;
        this.postMessage({ message: 'hideSubtitles' });
    }
    showSubtitles() {
        this.options.showSubtitles = true;
        this.postMessage({ message: 'showSubtitles' });
    }
    hideTitle() {
        this.options.hideTitle = true;
        this.postMessage({ message: 'hideTitle' });
    }
    showTitle() {
        this.options.hideTitle = false;
        this.postMessage({ message: 'showTitle' });
    }
    hidePoster() {
        this.options.hidePoster = true;
        this.postMessage({ message: 'hidePoster' });
    }
    showPoster() {
        this.options.hidePoster = false;
        this.postMessage({ message: 'showPoster' });
    }
    pause() {
        this.postMessage({ message: 'pause' });
    }
    mute() {
        this.options.muted = true;
        this.postMessage({ message: 'mute' });
    }
    unmute() {
        this.options.muted = false;
        this.postMessage({ message: 'unmute' });
    }
    seek(time: number) {
        this.postMessage({ message: 'seek', seek: time });
    }
    setCurrentTime(time: number) {
        this.postMessage({ message: 'setCurrentTime', currentTime: time });
    }
    setVolume(volume: number) {
        this.postMessage({ message: 'setVolume', volume });
    }
    setAutoplay(autoplay: boolean) {
        this.options.autoplay = autoplay;
        this.postMessage({ message: 'setAutoplay', autoplay });
    }
    setLoop(loop: boolean) {
        this.options.loop = loop;
        this.postMessage({ message: 'setLoop', loop });
    }
    setChromeless(chromeless: boolean) {
        this.options.chromeless = chromeless;
        this.postMessage({ message: 'setChromeless', chromeless });
    }
    setPlaybackRate(rate: number) {
        this.options.playbackRate = rate;
        this.postMessage({ message: 'setPlaybackRate', rate }, undefined, true);
    }
    exitFullscreen() {
        this.postMessage({ message: 'exitFullscreen' }, undefined, true);
    }
    requestFullscreen() {
        this.postMessage({ message: 'requestFullscreen' }, undefined, true);
    }
    exitPictureInPicture() {
        this.postMessage({ message: 'exitPictureInPicture' }, undefined, true);
    }
    requestPictureInPicture() {
        this.postMessage({ message: 'requestPictureInPicture' }, undefined, true);
    }
    setTheme(theme: PlayerTheme) {
        this.postMessage({ message: 'setTheme', theme });
    }
    getPaused(callback?: (paused: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getPaused' }, callback);
    }
    getMuted(callback?: (muted: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getMuted' }, callback);
    }
    getPlaying(callback?: (muted: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getPlaying' }, callback);
    }
    getDuration(callback?: (duration: number) => void): Promise<number> {
        return this.postMessage({ message: 'getDuration' }, callback, true);
    }
    getCurrentTime(callback?: (currentTime: number) => void): Promise<number> {
        return this.postMessage({ message: 'getCurrentTime' }, callback);
    }
    getPlaybackRate(callback?: (rate: number) => void): Promise<number> {
        return this.postMessage({ message: 'getPlaybackRate' }, callback);
    }
    getVolume(callback?: (volume: number) => void): Promise<number> {
        return this.postMessage({ message: 'getVolume' }, callback);
    }
    getLoop(callback?: (loop: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getLoop' }, callback);
    }
    getVideoSize(callback?: (size: {width: number, height: number}) => void): Promise<{width: number, height: number}> {
        return this.postMessage({ message: 'getVideoSize' }, callback, true);
    }

    addEventListener<K extends keyof PlayerSdkEvent>(event: K, callback: PlayerSdkEvent[K]) {
        this.userEventListeners.push({ event, callback });
    }

    destroy() {
        this.postMessage({ message: 'destroy' });
        setTimeout(() => this.iframe?.parentElement?.removeChild(this.iframe), 0);
    }

    private createNewPlayer(iframe: HTMLIFrameElement, options: SdkOptions) {
        this.setIframeSrc(iframe, this.buildPlayerUrl(options));
    }

    private buildPlayerUrl(options: SdkOptions) {
        if (!options.id) {
            throw new Error("Missing id in options");
        }

        const url = this.iframeUrl
            .replace("${id}", options.id)
            .replace("${type}", options.live ? "live" : "vod");

        return this.addParametersInIframeHash(`${url}?${this.urlParametersFromOptions(options)}`, options);
    }

    private bindExistingPlayer(iframe: HTMLIFrameElement) {
        this.setIframeSrc(iframe, this.addParametersInIframeHash(iframe.src, {} as SdkOptions));
    }

    private addParametersInIframeHash(url: string, options: SdkOptions) {
        const addParameterInIframeHash = (parameter: string, value?: string) => {
            const indexOfHash = url.indexOf("#");
            const parameterAndValue = value ? `${parameter}:${value}` : parameter;

            if (indexOfHash === -1) {
                return `${url}#${parameterAndValue}`;
            }
            const beforeHash = url.substr(0, indexOfHash);
            let afterHash = url.substr(indexOfHash + 1);

            afterHash = afterHash.replace(new RegExp(`${parameter}(:[^;]+)?;?`), "");

            return `${beforeHash}#${parameterAndValue};${afterHash}`;
        };

        url = addParameterInIframeHash("sdkPlayerId", "" + this.sdkPlayerId);
        url = addParameterInIframeHash("sdkOrigin", btoa(this.sdkOrigin));
        url = addParameterInIframeHash("api");

        if (options.hideControls === true) {
            url = addParameterInIframeHash("hide-controls");
        }

        if (options.chromeless === true) {
            url = addParameterInIframeHash("chromeless");
        }

        if (options.hidePoster === true) {
            url = addParameterInIframeHash("hide-poster");
        }

        if (options.loop === true) {
            url = addParameterInIframeHash("loop");
        }

        if (options.hideTitle === true) {
            url = addParameterInIframeHash("hide-title");
        }

        if (options.showSubtitles === true) {
            url = addParameterInIframeHash("show-subtitles");
        }

        if(options.ads?.adTagUrl) {
            url = addParameterInIframeHash(`adTagUrl:${encodeURIComponent(options.ads?.adTagUrl)}`);
        }

        if(!isNaN(parseInt(""+options.sequence?.end, 10)) && !isNaN(parseInt(""+options.sequence?.start, 10))) {
            url = addParameterInIframeHash(`t=${options.sequence?.start},${options.sequence?.end}`);
        }

        return url;
    }

    private urlParametersFromOptions(options: SdkOptions) {
        const allowedKeys = ["id", "live", "autoplay", "muted", "metadata", "hideControls", "hidePoster",
            "chromeless", "loop", "hideTitle", "iframeUrl", "token", "showSubtitles", "ts","avh"];

        const optionsAsAny = options as any;
        optionsAsAny.ts = new Date().getTime();

        if(options.privateSession) {
            optionsAsAny.avh = options.privateSession;
        }

        return Object.keys(options).map((key: string) => {
            if(allowedKeys.indexOf(key) === -1) {
                return;
            }
            if (key === "metadata" && typeof optionsAsAny[key] === "object") {
                const metadata = optionsAsAny[key];
                return Object.keys(metadata).map((metadataName: string) => {
                    return "metadata[" + metadataName + "]=" + metadata[metadataName];
                }).join("&");
            }
            return key + '=' + optionsAsAny[key];
        }).join('&');
    }

    private onEvent(data: PlayerEvent) {
        const userData = { ...data } as any;
        delete userData.type;
        delete userData.sdkPlayerId;

        this.userEventListeners
            .filter(uel => uel.event === data.type)
            .forEach(uel => uel.callback(userData));

        switch (data.type) {
            case 'ready':
                this.onVideoReady();
                break;
            case 'sdkSync':
                this.onSdkInSync();
                break;
        }
    }

    private onSdkInSync() {
        if (!this.sdkInSync) {
            this.sdkInSync = true;
            this.onceSdkInSyncCallbacks.forEach(cb => {
                cb();
            });
        }
    }

    private onVideoReady() {
        if(!this.currentVideoReady) {
            this.currentVideoReady = true;
            this.onceVideoReadyCallbacks.forEach(cb => {
                cb();
            });
        }
    }

    private postMessage<T>(message: any, callback?: (arg: T) => void, requireVideoReady: boolean = false): Promise<T> {

        return new Promise((resolve, reject): void => {

            if (!this.playerOrigin || !this.iframe?.contentWindow) {
                reject();
                return;
            }

            const messageWithPlayerId = {
                ...message,
                sdkPlayerId: this.sdkPlayerId
            }

            const callbackId = this.makeId(16);
            this.postMessageCallbacks[callbackId] = (res: T) => {
                resolve(res as T);
                if (!!callback) {
                    callback(res);
                }
            };
            messageWithPlayerId.callbackId = callbackId;

            if(!this.currentVideoReady && requireVideoReady) {
                this.onceVideoReadyCallbacks.push(() => this.playerOrigin && this.iframe?.contentWindow?.postMessage(messageWithPlayerId, this.playerOrigin));
                return;
            }

            if (this.sdkInSync && !!this.playerOrigin) {
                this.iframe.contentWindow.postMessage(messageWithPlayerId, this.playerOrigin);
                return;
            }

            this.onceSdkInSyncCallbacks.push(() => this.playerOrigin && this.iframe?.contentWindow?.postMessage(messageWithPlayerId, this.playerOrigin));
        });
    }

    private makeId(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private createIframe(target: Element) {
        const ifr = document.createElement('iframe');
        ifr.style.height = "100%";
        ifr.style.width = "100%";
        ifr.allowFullscreen = true;
        ifr.allow = "autoplay";
        target.appendChild(ifr);
        return ifr;
    }

    private setIframeSrc(iframe: HTMLIFrameElement, url: string) {
        iframe.src = url;
    }
}