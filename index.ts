type UserEventListener = {
    event: string;
    callback: (data?: any) => void;
}

type PlayerEvent = {
    type: string;
    data: any;
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
    loop?: boolean;
    hideTitle?: boolean;
    iframeUrl?: string;
    token?: string;
}

export class PlayerSdk {
    private static DEFAULT_IFRAME_URL = "https://embed.api.video/${type}/${id}";

    private iframe: HTMLIFrameElement | null = null;
    private playerReady: boolean = false;
    private onceReadyCallbacks: (() => void)[] = [];
    private userEventListeners: UserEventListener[] = [];
    private sdkPlayerId: number;
    private sdkOrigin: string;
    private playerOrigin: string | null = null;
    private postMessageCallbacks: { [callbackId: string]: (arg: any) => void } = {};
    private iframeUrl: string;

    static nextSdkPlayerId: number = 1;

    constructor(targetSelector: string, userOptions?: SdkOptions) {
        this.sdkPlayerId = PlayerSdk.nextSdkPlayerId++;

        this.sdkOrigin = `${window.location.protocol}//${window.location.host}`;

        const target = document.querySelector(targetSelector);
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

        this.onceReadyCallbacks = [];
        this.userEventListeners = [];
        this.playerReady = false;
        this.playerOrigin = new URL(this.iframeUrl).origin;

        window.addEventListener("message", (message) => {
            if (message.origin === this.playerOrigin && parseInt(message.data?.sdkPlayerId, 10) === this.sdkPlayerId) {
                if (!!message.data.callbackId && !!this.postMessageCallbacks[message.data.callbackId]) {
                    this.postMessageCallbacks[message.data.callbackId](message.data.arg);
                } else {
                    this.onEvent(message.data);
                }
            }
        }, false);
    }

    loadConfig(options: SdkOptions) {
        this.postMessage({
            message: 'loadConfig',
            url: this.buildPlayerUrl(options)
        });
    }

    play() {
        this.postMessage({ message: 'play' });
    }
    hideControls() {
        this.postMessage({ message: 'hideControls' });
    }
    showControls() {
        this.postMessage({ message: 'showControls' });
    }
    pause() {
        this.postMessage({ message: 'pause' });
    }
    mute() {
        this.postMessage({ message: 'mute' });
    }
    unmute() {
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
    setLoop(loop: boolean) {
        this.postMessage({ message: 'setLoop', loop });
    }
    setPlaybackRate(rate: number) {
        this.postMessage({ message: 'setPlaybackRate', rate });
    }
    getPaused(callback?: (paused: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getPaused' }, callback);
    }
    getMuted(callback?: (muted: boolean) => void): Promise<boolean> {
        return this.postMessage({ message: 'getMuted' }, callback);
    }
    getDuration(callback?: (duration: number) => void): Promise<number> {
        return this.postMessage({ message: 'getDuration' }, callback);
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

    addEventListener(event: string, callback: () => void) {
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

        if (options.loop === true) {
            url = addParameterInIframeHash("loop");
        }

        if (options.hideTitle === true) {
            url = addParameterInIframeHash("hide-title");
        }

        return url;
    }

    private urlParametersFromOptions(options: SdkOptions) {
        const optionsAsAny = options as any;
        optionsAsAny.ts = new Date().getTime();
        return Object.keys(options).map((key: string) => {
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
            case 'sdkSync':
                this.onReady();
                break;
        }
    }

    private onReady() {
        if (!this.playerReady) {
            this.playerReady = true;
            this.onceReadyCallbacks.forEach(cb => {
                cb();
            });
        }
    }

    private postMessage<T>(message: any, callback?: (arg: T) => void): Promise<T> {

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


            if (this.playerReady && !!this.playerOrigin) {
                this.iframe.contentWindow.postMessage(messageWithPlayerId, this.playerOrigin);
            } else {
                this.onceReadyCallbacks.push(() => this.playerOrigin && this.iframe?.contentWindow?.postMessage(messageWithPlayerId, this.playerOrigin));
            }
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
        target.appendChild(ifr);
        return ifr;
    }

    private setIframeSrc(iframe: HTMLIFrameElement, url: string) {
        iframe.src = url;
    }
}