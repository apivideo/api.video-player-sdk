![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)

# api.video player SDK

SDK to control and interact with the api.video HTML5 Player

# SDK usage

## Installation method #1: requirejs

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

## Installation method #2: typescript

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


## Simple include in a javascript project

Include the SDK in your HTML file like so:

```html
<head>
    ...
    <script src="https://unpkg.com/@api.video/player-sdk" defer></script>
</head>
```

Then, once the `window.onload` event has been trigered, create your player using `new PlayerSdk()`:
```html
<script type="text/javascript">
    window.player = new PlayerSdk("#target", { 
        id: "<VIDEO_ID>", 
        // ... other optional options 
    });
</script>
```

## SDK instanciation

The PlayerSdk constructor takes 2 parameters:
- `targetSelector: string` a CSS selector targeting the DOM element in which you want to create the player (eg. "#target")
- `options: SdkOptions` an object containing the player options. The available options are the following:


Option name     | Mandatory             | Type      | Description
---:            | ---                   | ---       | ---
id              | **yes**               | string    | the id of the video
token           | yes for private video | string    | the [private video](https://api.video/blog/tutorials/tutorial-private-videos) url token
live            | no (default: false)   | boolean   | indicate that the video is a live one
autoplay        | no (default: false)   | boolean   | start playing the video as soon as it is loaded
muted           | no (default: false)   | boolean   | the video is muted
metadata        | no (default: empty)   | object    | object containing [metadata](https://api.video/blog/tutorials/dynamic-metadata) (see **Full example** below)
hideControls    | no (default: false)   | boolean   | the controls are hidden
hideTitle       | no (default: false)   | boolean   | the video title is hidden
loop            | no (default: false)   | boolean   | once the video is finished it automatically starts again


The sdk instance can be used to control the video playback, and to listen to player events.

## SDK methods

The sdk instance has the following methods:

#### `load(options: SdkOptions)`
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
#### `setLoop(loop: boolean)`
> Define if the video should be played in loop.
#### `seek(time: number)` 
> Add/substract the given number of seconds to/from the playback time. 
#### `setCurrentTime(time: number)` 
> Set the current playback time (seconds). 
>
>Example:
>```javascript
>    player.seek(-15); // Go 15 seconds backward
>``` 
#### `setVolume(volume: number)` 
> Change the audio volume to the given value. From 0 to 1 (0 = muted, 1 = 100%).
>
> Example:
> ```javascript
>     player.volume(0.75); // Set the volume to 75% 
> ``` 

#### `getPaused(callback?: (paused: boolean) => void): Promise<boolean>`
> Check weither the video is paused.
#### `getMuted(callback?: (muted: boolean) => void): Promise<boolean>`
> Check weither the video is muted.
#### `getDuration(callback?: (duration: number) => void): Promise<number>`
> Retrieve the duration of the video.
#### `getCurrentTime(callback?: (currentTime: number) => void): Promise<number>`
> Retrieve the current playback time of the video.
#### `getVolume(callback?: (volume: number) => void): Promise<number>`
> Retrieve the current volume.
#### `getLoop(callback?: (loop: boolean) => void): Promise<boolean>`
> Check weither the video is in loop mode.
#### `destroy()` 
> Destroy the player instance.
#### `addEventListener(event: string, callback: () => void)` 
> Define a callback function that will be called when the given event is triggered by the player. 
> 
> Available events are the following:
> 
> Event name          | Description
> ---:                | --- 
> ready               | The player is ready to play
> firstplay           | The video started to play for the first time
> play                | The video started to play (for the first time or after having been paused)
> pause               | The video has been paused
> ended               | The playback as reached the ended of the video
> error               | An error occured
> fullscreenchange    | The player goes to (or goes back from) full screen
> playerresize        | The player size has changed
> seeking             | The player is seeking
> 
> Example:
> ```javascript
>   // listen to the 'play' event
>   player.addEventListener('play', function() { 
>       console.log('play event received'); 
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

It's also possible to integrate the SDK in a page that already contains an embbeded player in order to control it and to listen to its events. Let's consider the following page :

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
