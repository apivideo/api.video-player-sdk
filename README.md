[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-player-sdk?style=social)](https://github.com/apivideo/api.video-player-sdk) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/.github/blob/main/assets/apivideo_banner.png)
<h1 align="center">api.video player SDK</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.


# Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
    - [Method #1: requirejs](#method-1-requirejs)
    - [Method #2: typescript](#method-2-typescript)
    - [Method #2: simple include in a javascript project](#method-2-simple-include-in-a-javascript-project)
- [Documentation](#documentation)
  - [Instanciation](#instanciation)
    - [Ads](#ads)
  - [Methods](#methods)
      - [`loadConfig(options: SdkOptions)`](#loadconfigoptions-sdkoptions)
      - [`play()`](#play)
      - [`pause()`](#pause)
      - [`mute()`](#mute)
      - [`unmute()`](#unmute)
      - [`hideControls(controls?: ControlName[])`](#hidecontrolscontrols-controlname)
      - [`showControls(controls?: ControlName[])`](#showcontrolscontrols-controlname)
      - [`setChromeless(chromeless: boolean)`](#setchromelesschromeless-boolean)
      - [`hideSubtitles()`](#hidesubtitles)
      - [`showSubtitles()`](#showsubtitles)
      - [`hideTitles()`](#hidetitles)
      - [`showTitles()`](#showtitles)
      - [`setLoop(loop: boolean)`](#setlooploop-boolean)
      - [`setAutoplay(autoplay: boolean)`](#setautoplayautoplay-boolean)
      - [`seek(time: number)`](#seektime-number)
      - [`setPlaybackRate(rate: number)`](#setplaybackraterate-number)
      - [`setCurrentTime(time: number)`](#setcurrenttimetime-number)
      - [`setVolume(volume: number)`](#setvolumevolume-number)
      - [`setVideoStyleObjectFit(value: "contain" | "cover" | "fill" | "none" | "scale-down")`](#setvideostyleobjectfitvalue-contain--cover--fill--none--scale-down)
      - [`setVideoStyleTransform(value: string)`](#setvideostyletransformvalue-string)
      - [`setTheme(theme: PlayerTheme)`](#setthemetheme-playertheme)
      - [`requestFullscreen()`](#requestfullscreen)
      - [`exitFullscreen()`](#exitfullscreen)
      - [`requestPictureInPicture()`](#requestpictureinpicture)
      - [`exitPictureInPicture()`](#exitpictureinpicture)
      - [`getPaused(callback?: (paused: boolean) => void): Promise<boolean>`](#getpausedcallback-paused-boolean--void-promiseboolean)
      - [`getPlaying(callback?: (playing: boolean) => void): Promise<boolean>`](#getplayingcallback-playing-boolean--void-promiseboolean)
      - [`getMuted(callback?: (muted: boolean) => void): Promise<boolean>`](#getmutedcallback-muted-boolean--void-promiseboolean)
      - [`getDuration(callback?: (duration: number) => void): Promise<number>`](#getdurationcallback-duration-number--void-promisenumber)
      - [`getCurrentTime(callback?: (currentTime: number) => void): Promise<number>`](#getcurrenttimecallback-currenttime-number--void-promisenumber)
      - [`getVolume(callback?: (volume: number) => void): Promise<number>`](#getvolumecallback-volume-number--void-promisenumber)
      - [`getLoop(callback?: (loop: boolean) => void): Promise<boolean>`](#getloopcallback-loop-boolean--void-promiseboolean)
      - [`getPlaybackRate(callback?: (rate: number) => void): Promise<number>`](#getplaybackratecallback-rate-number--void-promisenumber)
      - [`destroy()`](#destroy)
      - [`addEventListener(event: string, callback: () => void)`](#addeventlistenerevent-string-callback---void)
  - [Full example](#full-example)
  - [Control an existing embedded player using the SDK](#control-an-existing-embedded-player-using-the-sdk)
  


# Project description

SDK to control and interact with the api.video HTML5 Player


# Getting started

## Installation

### Method #1: requirejs

If you use requirejs you can add the SDK as a dependency to your project with 

```sh
$ npm install --save @api.video/player-sdk
```

You can then use the SDK in your script: 

```javascript
var { PlayerSdk } = require('@api.video/player-sdk');

var sdk = new PlayerSdk("#target", {
    id: "<VIDEO_ID>", 
    // ... other optional options
}); 
```

### Method #2: typescript

If you use Typescript you can add the SDK as a dependency to your project with 

```sh
$ npm install --save @api.video/player-sdk
```

You can then use the SDK in your script: 

```typescript
import { PlayerSdk } from '@api.video/player-sdk'

const sdk = new PlayerSdk("#target", {
    id: "<VIDEO_ID>", 
    // ... other optional options
});
```


### Method #2: simple include in a javascript project

Include the SDK in your HTML file like so:

```html
<head>
    ...
    <script src="https://unpkg.com/@api.video/player-sdk" defer></script>
</head>
```

Then, once the `window.onload` event has been triggered, create your player using `new PlayerSdk()`:
```html
<script type="text/javascript">
    window.player = new PlayerSdk("#target", { 
        id: "<VIDEO_ID>", 
        // ... other optional options 
    });
</script>
```

# Documentation

## Instanciation
 
The PlayerSdk constructor takes 2 parameters:
- `targetSelector: string | Element` a CSS selector targeting the DOM element in which you want to create the player (eg. "#target"), or the DOM element itself
- `options: SdkOptions` an object containing the player options. The available options are the following:


|    Option name | Mandatory             | Type    | Description                                                                                                  |
| -------------: | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
|             id | **yes**               | string  | the id of the video (videoId or liveStreamId)                                                                |
|          token | yes for private video | string  | the [private video](https://api.video/blog/tutorials/tutorial-private-videos) url token                      |
| privateSession | no                    | string  | the [private video](https://api.video/blog/tutorials/tutorial-private-videos) session id if needed           |
|           live | no (default: false)   | boolean | indicate that the video is a live one                                                                        |
|       autoplay | no (default: false)   | boolean | start playing the video as soon as it is loaded                                                              |
|          muted | no (default: false)   | boolean | the video is muted                                                                                           |
|       metadata | no (default: empty)   | object  | object containing [metadata](https://api.video/blog/tutorials/dynamic-metadata) (see **Full example** below) |
|   hideControls | no (default: false)   | boolean | the controls are hidden (except unmute button if the video starts muted)                                     |
|     chromeless | no (default: false)   | boolean | chromeless mode: all controls are hidden                                                                     |
|      hideTitle | no (default: false)   | boolean | the video title is hidden                                                                                    |
|     hidePoster | no (default: false)   | boolean | the poster image isn't displayed                                                                             |
|  showSubtitles | no (default: false)   | boolean | the video subtitles are shown by default                                                                     |
|           loop | no (default: false)   | boolean | once the video is finished it automatically starts again                                                     |
|   playbackRate | no (default: 1)       | number  | the playback rate of the video: 1 for normal, 2 for x2, etc.                                                 |
|   sequence | no        | {start: number, end: number}  | define a sequence of the video to play. The video will start at the `start` timecode and end at the `end` timecode. The timecodes are in seconds. |
| ads | no | {adTagUrl: string} | see below [ads](#ads) |


The sdk instance can be used to control the video playback, and to listen to player events.

### Ads
Ads can be displayed in the player. To do so, you need to pass the `ads` option to the sdk constructor. In the `ads` object, pass the `adTagUrl` property with the url of the ad tag. The ad tag must be a VAST 2.0 or 3.0 url. For more information about VAST, check the [IAB documentation](https://www.iab.com/guidelines/vast/).

Note: ads are displayed using the [Google IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/quickstart).

## Methods

The sdk instance has the following methods:

#### `loadConfig(options: SdkOptions)`
> Load a new video in the same instance of the player. Available options are the same as the ones passed to the SDK constructor (see available).
>
> Example:
> ```javascript
>    player.loadConfig({
>       id: "<VIDEO_ID>",
>       hideTitle: true,
>       hideControls: true,
>    });
> ``` 
#### `play()` 
> Start playing the video.
#### `pause()` 
> Pause the video playback.
#### `mute()` 
> Mute the video.
#### `unmute()` 
> Unmute the video.
#### `hideControls(controls?: ControlName[])` 
> Hide the player controls.
> 
> `controls` parameter type definition:
> ```typescript 
> type ControlName = "play" | "seekBackward" | "seekForward" | "playbackRate"
>    | "volume" | "fullscreen" | "subtitles" | "chapters"
>    | "pictureInPicture" | "progressBar" | "chromecast" | "download" | "more";
> ```
>
> If no value is provided for the "controls" parameter, all controls will be hidden.
> 
> **Note**: the only control that can still be visible is the unmute button if the video as started muted. To hide all controls, including this one, use the setChromeless() method
> 
> Example:
> ```javascript
>     player.hideControls();
> ``` 
>
> If a list of control names if provided, the associated controls will be hidden.
> 
> Example:
> ```javascript
>     player.showControls();                          // display all controls ...
>     player.hideControls(["download", "subtitles"]); // ... except "download" and "subtitles"
> ``` 
>
#### `showControls(controls?: ControlName[])` 
> Show the player controls.
> 
> `controls` parameter type definition:
> ```typescript 
> type ControlName = "play" | "seekBackward" | "seekForward" | "playbackRate"
>    | "volume" | "fullscreen" | "subtitles" | "chapters"
>    | "pictureInPicture" | "progressBar" | "chromecast" | "download" | "more";
> ```
>
> If no value is provided for the "controls" parameter, all controls will be displayed.
> 
> Example:
> ```javascript
>     player.showControls();
> ``` 
>
> If a list of control names if provided, the associated controls will be displayed.
> 
> Example:
> ```javascript
>     player.hideControls();                          // hide all controls ...
>     player.showControls(["download", "subtitles"]); // ... except "download" and "subtitles" ...
>     // ...
>     player.showControls(["progressBar"]);           // ... and the progress bar
> ``` 
>
#### `setChromeless(chromeless: boolean)`
> Define if the player should be in chromeless mode (all controls hidden).
#### `hideSubtitles()` 
> Hide the player subtitles.
#### `showSubtitles()` 
> Show the player subtitles.
#### `hideTitles()` 
> Hide the video title at the top of the video.
#### `showTitles()` 
> Show the video title at the top of the video.
#### `setLoop(loop: boolean)`
> Define if the video should be played in loop.
#### `setAutoplay(autoplay: boolean)`
> Define if the video should start playing as soon as it is loaded                                                              
#### `seek(time: number)` 
> Add/substract the given number of seconds to/from the playback time. 
#### `setPlaybackRate(rate: number)` 
> Set the current playback rate. 
>Example:
>```javascript
>    player.setPlaybackRate(2); // Play at 2x rate
>```
#### `setCurrentTime(time: number)` 
> Set the current playback time (seconds). 
>
>Example:
>```javascript
>    player.setCurrentTime(24); // Go the 24th second
>``` 
#### `setVolume(volume: number)` 
> Change the audio volume to the given value. From 0 to 1 (0 = muted, 1 = 100%).
>
> Example:
> ```javascript
>     player.setVolume(0.75); // Set the volume to 75% 
> ``` 
#### `setVideoStyleObjectFit(value: "contain" | "cover" | "fill" | "none" | "scale-down")` 
> Change the [object-fit](https://developer.mozilla.org/fr/docs/Web/CSS/object-fit) CSS value of the video tag.

> Example:
> ```javascript
>     player.setVideoStyleObjectFit("cover"); // Set the object-fit to cover
> ``` 

#### `setVideoStyleTransform(value: string)` 
> Change the [transform](https://developer.mozilla.org/fr/docs/Web/CSS/transform) CSS value of the video tag.

> Example:
> ```javascript
>     player.setVideoStyleTransform("rotateY(180deg)"); // Apply a 180deg rotation around the Y axis (mirroring)
> ``` 

#### `setTheme(theme: PlayerTheme)` 
> Change the appearance of the player.
> 
> `theme` parameter type definition:
> ```typescript
> type PlayerTheme = {
>     text?: string;
>     link?: string;
>     linkHover?: string;
>     trackPlayed?: string;
>     trackUnplayed?: string;
>     trackBackground?: string;
>     backgroundTop?: string;
>     backgroundBottom?: string;
>     backgroundText?: string;
>     linkActive?: string;
> }
> ```
>
> Example:
> ```javascript
>     player.setTheme({
>         link: "red",
>         linkHover: "rgba(0, 255, 0, 1)",
>         backgroundBottom: "#0000ff",
>     }); 
> ``` 

#### `requestFullscreen()`
> Request fullscreen mode (this may not work in some cases depending on browser restrictions)
#### `exitFullscreen()`
> Leave fullscreen mode   
#### `requestPictureInPicture()`
> Request picture in picture mode (this may not work in some cases depending on browser restrictions)
#### `exitPictureInPicture()`
> Leave picture in picture mode    
#### `getPaused(callback?: (paused: boolean) => void): Promise<boolean>`
> Check weither the video is paused.
#### `getPlaying(callback?: (playing: boolean) => void): Promise<boolean>`
> Check weither the video is playing.
#### `getMuted(callback?: (muted: boolean) => void): Promise<boolean>`
> Check weither the video is muted.
#### `getDuration(callback?: (duration: number) => void): Promise<number>`
> Retrieve the duration of the video.
#### `getCurrentTime(callback?: (currentTime: number) => void): Promise<number>`
> Retrieve the current playback time of the video.
#### `getVolume(callback?: (volume: number) => void): Promise<number>`
> Retrieve the current volume.
#### `getLoop(callback?: (loop: boolean) => void): Promise<boolean>`
> Check whether the video is in loop mode.
#### `getPlaybackRate(callback?: (rate: number) => void): Promise<number>`
> Retrieve the playback rate.
#### `destroy()` 
> Destroy the player instance.
#### `addEventListener(event: string, callback: () => void)` 
> Define a callback function that will be called when the given event is triggered by the player. 
> 
> Available events are the following:
> 
> Event name            | Description | Parameter
> ---:                  | ---         | ---
> controlsdisabled      | Controls are now disabled | -
> controlsenabled       | Controls are now enabled | -
> ended                 | The playback as reached the ended of the video | -
> error                 | An error occured | -
> firstplay             | The video started to play for the first time | -
> fullscreenchange      | The player goes to (or goes back from) full screen | -
> mouseenter            | The user's mouse entered the player area | -
> mouseleave            | The user's mouse leaved the player area | -
> pause                 | The video has been paused | -
> play                  | The video started to play (for the first time or after having been paused) | -
> playerresize          | The player size has changed | -
> qualitychange         | The video quality has changed  | `{ resolution: { height: number, width: number } }`
> ratechange            | The playback rate has changed | -
> ready                 | The player is ready to play | -
> resize                | The video size has changed
> seeking               | The player is seeking | -
> timeupdate            | The playback time has changed  | `{ currentTime: number }`
> useractive            | The user is active | -
> userinactive          | The user is inactive | -
> volumechange          | The volume has changed  | `{ volume: number }`
> 
> Examples:
> ```javascript
>   // listen to the 'play' event
>   player.addEventListener('play', function() { 
>       console.log('play event received'); 
>   });
> 
>   player.addEventListener('qualitychange', function(ev) { 
>       console.log(`quality has changed: ${ev.resolution.width}x${ev.resolution.height}`); 
>   });
> ```

## Full example

```html
<html>
    <head>
        ...
        <script src="/index.js" defer></script>
    </head>

    <body>
        <div id="target"></div>

        <!-- buttons that call player methods to control the video playback -->
        <button onclick="javascript:player.play()"  id="play-btn">play</button>
        <button onclick="javascript:player.pause()" id="pause-btn" disabled>pause</button>
        <button onclick="javascript:player.mute()">mute</button>
        <button onclick="javascript:player.unmute()">unmute</button>
    </body>

    <script type="text/javascript">
        window.onload = function() {
            // create the player in the #target element
            window.player = new PlayerSdk("#target", {
                id: "123456",
                metadata: {
                    dogcat: "dog"
                }
            });

            // when the 'play' event is received, disable the 'play' button and enable the 'pause' button
            player.addEventListener('play', function() {
                document.getElementById('play-btn').disabled = true;
                document.getElementById('pause-btn').disabled = false;
            });

            // when the 'pause' event is received, disable the 'pause' button and enable the 'play' button
            player.addEventListener('pause', function() {
                document.getElementById('play-btn').disabled = false;
                document.getElementById('pause-btn').disabled = true;
            });
        };
    </script>
</html>
```

## Control an existing embedded player using the SDK

It's also possible to integrate the SDK in a page that already contains an embedded player in order to control it and to listen to its events. Let's consider the following page :

```html
<html>
    <head>
        ...
    </head>

    <body>
        ...
        <!-- my embedded player -->
        <iframe src="//embed.api.video/vod/vi54sj9dAakOHJXKrUycCQZp" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        ...
    </body>
</html>
```

To attach the SDK to this player, you'll have to make the following changed in your page:
    
- import the `sdk.js` script in your page,
- create a `PlayerSdk` instance once the page is loaded.

Here is how the page will look like with these changes :

```html
<html>
    <head>
        ...
        <script src="/index.js" defer></script>
    </head>

    <body>
        ...
        <!-- my embedded player -->
        <iframe id="myPlayer" src="//embed.api.video/vod/vi54sj9dAakOHJXKrUycCQZp" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        ...
    </body>

    <script type="text/javascript">
        window.onload = function() {
            // attach the sdk to the existing player
            window.player = new PlayerSdk("#myPlayer");

            // window.player can now be used to control the player as described above
        };
    </script>
</html>
```
