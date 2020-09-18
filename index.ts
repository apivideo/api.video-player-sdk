
type UserEventListener = {
    event: string;
    callback: () => void;
}

type PlayerEvent = {
    type: string;
    data: any;
}

export class PlayerSdk {
    private static DEFAULT_IFRAME_URL = "https://embed.api.video/${type}/${id}";
    
    private iframe: HTMLIFrameElement|null = null;
    private playerReady: boolean = false;
    private onceReadyCallbacks: (() => void)[] = [];
    private userEventListeners: UserEventListener[] = [];
    private sdkPlayerId: number;
    private sdkOrigin: string;
    private playerOrigin: string|null = null;
    private postMessageCallbacks: { [callbackId: string]: (arg: any) => void } = {};
    private iframeUrl: string;

    static nextSdkPlayerId: number = 1;

    constructor(targetSelector: string, options?: any) {
        this.sdkPlayerId = PlayerSdk.nextSdkPlayerId++;

        this.sdkOrigin = `${window.location.protocol}//${window.location.host}`;

        const target = document.querySelector(targetSelector);
        if (target == null) {
            throw new Error("No match found for selector " + targetSelector);
        }
        
        this.iframe = target.tagName !== "IFRAME" 
            ? this.createIframe(target)
            : target as HTMLIFrameElement
        
        options = options || {};
        this.iframeUrl = options.iframeUrl || PlayerSdk.DEFAULT_IFRAME_URL;

        if(!this.iframe.src) {
            this.createNewPlayer(this.iframe, options)
        } else {
            this.bindExistingPlayer(this.iframe);
        }
        
        this.onceReadyCallbacks = [];
        this.userEventListeners = [];
        this.playerReady = false;
        this.playerOrigin = new URL(this.iframeUrl).origin;
        
        window.addEventListener("message", (message) => {
            if (message.origin === this.playerOrigin && message.data?.sdkPlayerId == this.sdkPlayerId) {
                if(!!message.data.callbackId && !!this.postMessageCallbacks[message.data.callbackId]) {
                    this.postMessageCallbacks[message.data.callbackId](message.data.arg);
                } else {
                    this.onEvent(message.data);
                }
            }
        }, false);
    }

    createNewPlayer(iframe: HTMLIFrameElement, options: any) {
        const iframeUrl = this.iframeUrl
            .replace("${id}", options.id)
            .replace("${type}", options.live ? "live" : "vod");

        this.setIframeSrc(iframe, this.addParametersInIframeHash(`${iframeUrl}?${this.urlParametersFromOptions(options)}`));
    }

    bindExistingPlayer(iframe: HTMLIFrameElement) {
        this.setIframeSrc(iframe, this.addParametersInIframeHash(iframe.src));
    }

    addParametersInIframeHash(url: string) {
        url = this.addParameterInIframeHash(url, "sdkPlayerId", ""+this.sdkPlayerId);
        url = this.addParameterInIframeHash(url, "sdkOrigin", btoa(this.sdkOrigin));
        url = this.addParameterInIframeHash(url, "api");
        return url;
    }

    addParameterInIframeHash(url: string, parameter: string, value?: string): string {
        const indexOfHash = url.indexOf("#");
        const parameterAndValue = value ? `${parameter}:${value}` : parameter;

        if(indexOfHash === -1) {
            return `${url}#${parameterAndValue}`;
        }
        const beforeHash = url.substr(0, indexOfHash);
        let afterHash = url.substr(indexOfHash + 1);
        
        afterHash = afterHash.replace(new RegExp(`${parameter}(:[^;]+)?;?`), "");

        return `${beforeHash}#${parameterAndValue};${afterHash}`;
    }

    play() {
        this.postMessage({ message: 'play' });
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
    getPaused(callback: (paused: Boolean) => void) {
        this.postMessage({ message: 'getPaused' }, callback);
    }
    getMuted(callback: (muted: Boolean) => void) {
        this.postMessage({ message: 'getMuted' }, callback);
    }
    getDuration(callback: (duration: Number) => void) {
        this.postMessage({ message: 'getDuration' }, callback);
    }
    getCurrentTime(callback: (currentTime: Number) => void) {
        this.postMessage({ message: 'getCurrentTime' }, callback);
    }
    getVolume(callback: (volume: Number) => void) {
        this.postMessage({ message: 'getVolume' }, callback);
    }
    getLoop(callback: (loop: Boolean) => void) {
        this.postMessage({ message: 'getLoop' }, callback);
    }
    


    addEventListener(event: string, callback: () => void) {
        this.userEventListeners.push({ event, callback });
    }

    destroy() {
        this.postMessage({ message: 'destroy' });
        setTimeout(() => this.iframe?.parentElement?.removeChild(this.iframe), 0);
    }

    private urlParametersFromOptions(options: any) {
        options.ts = new Date().getTime();
        return Object.keys(options).map(function (key: string) {
            return key + '=' + options[key];
        }).join('&');
    }

    private onEvent(data: PlayerEvent) {
        this.userEventListeners
            .filter(uel => uel.event === data.type)
            .forEach(uel => uel.callback());

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

    private postMessage(message: any, callback?: (arg: any) => void) {
        if(!this.playerOrigin || !this.iframe?.contentWindow) {
            return;
        }
        const messageWithPlayerId = {
            ...message,
            sdkPlayerId: this.sdkPlayerId
        }

        if(!!callback) {
            const callbackId = this.makeId(16);
            this.postMessageCallbacks[callbackId] = callback;
            messageWithPlayerId.callbackId = callbackId; 
        }

        if (this.playerReady && !!this.playerOrigin) {
            this.iframe.contentWindow.postMessage(messageWithPlayerId, this.playerOrigin);
        } else {
            this.onceReadyCallbacks.push(() => this.playerOrigin && this.iframe?.contentWindow?.postMessage(messageWithPlayerId, this.playerOrigin));
        }
    }

    private makeId(length: number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    private createIframe(target: Element) {
        var ifr = document.createElement('iframe');
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