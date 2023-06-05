# Changelog
All changes to this project will be documented in this file.

## [1.2.25] - 2023-06-02
- Add ads support
## [1.2.24] - 2023-03-03
- Add `sequence` option
  
## [1.2.23] - 2023-02-15
- Add `privateSession` option

## [1.2.22] - 2022-11-04
- Add `getPlaying()` method

## [1.2.21] - 2022-05-23
- Apply `setVideoStyleObjectFit()` and `setVideoStyleTransform()` to poster.

## [1.2.20] - 2022-05-23
- Add `setVideoStyleObjectFit()` and `setVideoStyleTransform()` methods.
  
## [1.2.19] - 2022-05-19
- When loadConfig() is called, apply the last config settings
  
## [1.2.18] - 2022-05-12
- Fix showControls & hideControls methods when called before the player is ready.
  
## [1.2.17] - 2022-04-27
- add exitFullscreen(), requestFullscreen(), exitPictureInPicture() and requestPictureInPicture()

## [1.2.16] - 2022-04-25
- add showPoster() and hidePoster()

## [1.2.15] - 2022-04-20
- Add event callback types
- Delay some methods execution after ready event is received
- Add playbackRate option
- Add hideTitle() and showTitle() methods
- Add setAutoplay() method

## [1.2.14] - 2022-04-11
- Add `chromeless` mode
- Add `hidePoster` option

## [1.2.13] - 2022-04-01
- Add the possibility to show/hide the "more" button

## [1.2.12] - 2021-12-23
- Add the possibility to directly provide a DOM Element at instantiation
  
## [1.2.11] - 2021-12-15
- Add `controls` parameter in `hideControls()` and `showControls()`

## [1.2.10] - 2021-12-10
- Add `allow="autoplay"` in iframe tag

## [1.2.9] - 2021-10-07
- Add setTheme method

## [1.2.8] - 2021-05-28
- Add showSubtitles() / hideSubtitles() methods
  
## [1.2.7] - 2021-05-28
- Add "token" in SdkOptions type

## [1.2.6] - 2021-04-21
- Add setPlaybackRate(), showControls(), hideControls() & getPlaybackRate methods
- Add  new player events

## [1.2.5] - 2021-03-16
- Add loadConfig method
- Add "hideTitle" & "token" options

## [1.2.4] - 2021-02-25
- Add "hideControls" and "loop" options

## [1.2.3] - 2021-02-02
- Fix a string/number comparaison

## [1.2.2] - 2021-02-02
- getPaused, getMuted, getDuration, getCurrentTime, getVolume and getLoop now return promises
- Add some unit test

## [1.2.1] - 2021-01-15
- Add the possibility to specify metadata