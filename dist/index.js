"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
window.apiVideoSdk = {
    create: function (targetId, options) { return new PlayerSdk(targetId, options); }
};
var PlayerSdk = /** @class */ (function () {
    function PlayerSdk(targetSelector, options) {
        var _this = this;
        this.iframe = null;
        this.playerReady = false;
        this.onceReadyCallbacks = [];
        this.userEventListeners = [];
        this.playerOrigin = null;
        this.postMessageCallbacks = {};
        this.sdkPlayerId = PlayerSdk.nextSdkPlayerId++;
        this.sdkOrigin = window.location.protocol + "//" + window.location.host;
        var target = document.querySelector(targetSelector);
        if (target == null) {
            throw new Error("No match found for selector " + targetSelector);
        }
        this.iframe = target.tagName !== "IFRAME"
            ? this.createIframe(target)
            : target;
        options = options || {};
        this.iframeUrl = options.iframeUrl || PlayerSdk.DEFAULT_IFRAME_URL;
        if (!this.iframe.src) {
            this.createNewPlayer(this.iframe, options);
        }
        else {
            this.bindExistingPlayer(this.iframe);
        }
        this.onceReadyCallbacks = [];
        this.userEventListeners = [];
        this.playerReady = false;
        this.playerOrigin = new URL(this.iframeUrl).origin;
        window.addEventListener("message", function (message) {
            var _a;
            if (message.origin === _this.playerOrigin && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.sdkPlayerId) == _this.sdkPlayerId) {
                if (!!message.data.callbackId && !!_this.postMessageCallbacks[message.data.callbackId]) {
                    _this.postMessageCallbacks[message.data.callbackId](message.data.arg);
                }
                else {
                    _this.onEvent(message.data);
                }
            }
        }, false);
    }
    PlayerSdk.prototype.createNewPlayer = function (iframe, options) {
        var iframeUrl = this.iframeUrl
            .replace("${id}", options.id)
            .replace("${type}", options.live ? "live" : "vod");
        this.setIframeSrc(iframe, this.addParametersInIframeHash(iframeUrl + "?" + this.urlParametersFromOptions(options)));
    };
    PlayerSdk.prototype.bindExistingPlayer = function (iframe) {
        this.setIframeSrc(iframe, this.addParametersInIframeHash(iframe.src));
    };
    PlayerSdk.prototype.addParametersInIframeHash = function (url) {
        url = this.addParameterInIframeHash(url, "sdkPlayerId", "" + this.sdkPlayerId);
        url = this.addParameterInIframeHash(url, "sdkOrigin", btoa(this.sdkOrigin));
        url = this.addParameterInIframeHash(url, "api");
        return url;
    };
    PlayerSdk.prototype.addParameterInIframeHash = function (url, parameter, value) {
        var indexOfHash = url.indexOf("#");
        var parameterAndValue = value ? parameter + ":" + value : parameter;
        if (indexOfHash === -1) {
            return url + "#" + parameterAndValue;
        }
        var beforeHash = url.substr(0, indexOfHash);
        var afterHash = url.substr(indexOfHash + 1);
        afterHash = afterHash.replace(new RegExp(parameter + "(:[^;]+)?;?"), "");
        return beforeHash + "#" + parameterAndValue + ";" + afterHash;
    };
    PlayerSdk.prototype.play = function () {
        this.postMessage({ message: 'play' });
    };
    PlayerSdk.prototype.pause = function () {
        this.postMessage({ message: 'pause' });
    };
    PlayerSdk.prototype.mute = function () {
        this.postMessage({ message: 'mute' });
    };
    PlayerSdk.prototype.unmute = function () {
        this.postMessage({ message: 'unmute' });
    };
    PlayerSdk.prototype.seek = function (time) {
        this.postMessage({ message: 'seek', seek: time });
    };
    PlayerSdk.prototype.setVolume = function (volume) {
        this.postMessage({ message: 'setVolume', volume: volume });
    };
    PlayerSdk.prototype.setLoop = function (loop) {
        this.postMessage({ message: 'setLoop', loop: loop });
    };
    PlayerSdk.prototype.getPaused = function (callback) {
        this.postMessage({ message: 'getPaused' }, callback);
    };
    PlayerSdk.prototype.getMuted = function (callback) {
        this.postMessage({ message: 'getMuted' }, callback);
    };
    PlayerSdk.prototype.getDuration = function (callback) {
        this.postMessage({ message: 'getDuration' }, callback);
    };
    PlayerSdk.prototype.getCurrentTime = function (callback) {
        this.postMessage({ message: 'getCurrentTime' }, callback);
    };
    PlayerSdk.prototype.getVolume = function (callback) {
        this.postMessage({ message: 'getVolume' }, callback);
    };
    PlayerSdk.prototype.getLoop = function (callback) {
        this.postMessage({ message: 'getLoop' }, callback);
    };
    PlayerSdk.prototype.addEventListener = function (event, callback) {
        this.userEventListeners.push({ event: event, callback: callback });
    };
    PlayerSdk.prototype.destroy = function () {
        var _this = this;
        this.postMessage({ message: 'destroy' });
        setTimeout(function () { var _a, _b; return (_b = (_a = _this.iframe) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(_this.iframe); }, 0);
    };
    PlayerSdk.prototype.urlParametersFromOptions = function (options) {
        options.ts = new Date().getTime();
        return Object.keys(options).map(function (key) {
            return key + '=' + options[key];
        }).join('&');
    };
    PlayerSdk.prototype.onEvent = function (data) {
        this.userEventListeners
            .filter(function (uel) { return uel.event === data.type; })
            .forEach(function (uel) { return uel.callback(); });
        switch (data.type) {
            case 'sdkSync':
                this.onReady();
                break;
        }
    };
    PlayerSdk.prototype.onReady = function () {
        if (!this.playerReady) {
            this.playerReady = true;
            this.onceReadyCallbacks.forEach(function (cb) {
                cb();
            });
        }
    };
    PlayerSdk.prototype.postMessage = function (message, callback) {
        var _this = this;
        var _a;
        if (!this.playerOrigin || !((_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow)) {
            return;
        }
        var messageWithPlayerId = __assign(__assign({}, message), { sdkPlayerId: this.sdkPlayerId });
        if (!!callback) {
            var callbackId = this.makeId(16);
            this.postMessageCallbacks[callbackId] = callback;
            messageWithPlayerId.callbackId = callbackId;
        }
        if (this.playerReady && !!this.playerOrigin) {
            this.iframe.contentWindow.postMessage(messageWithPlayerId, this.playerOrigin);
        }
        else {
            this.onceReadyCallbacks.push(function () { var _a, _b; return _this.playerOrigin && ((_b = (_a = _this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(messageWithPlayerId, _this.playerOrigin)); });
        }
    };
    PlayerSdk.prototype.makeId = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    PlayerSdk.prototype.createIframe = function (target) {
        var ifr = document.createElement('iframe');
        ifr.style.height = "100%";
        ifr.style.width = "100%";
        ifr.allowFullscreen = true;
        target.appendChild(ifr);
        return ifr;
    };
    PlayerSdk.prototype.setIframeSrc = function (iframe, url) {
        iframe.src = url;
    };
    PlayerSdk.DEFAULT_IFRAME_URL = "https://embed.api.video/${type}/${id}";
    PlayerSdk.nextSdkPlayerId = 1;
    return PlayerSdk;
}());
