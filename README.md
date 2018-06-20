# Track Moods and Top played tracks for the day using Spotify API

## Summary

The app allows you to handle your spotify playlists, to follow a new one from list of recommended playlist for you. Also you can play your tracks in the web and to set a **MOOD to every track** from a list of predefined moods.
Base on your played tracks and their mood, you can see your **TOP tracks** and your **MOOD** for this day.

## Structure

- web-app
- server
- data

Web app and server have their own package.json files

## Server

- Node.js - https://nodejs.org/en/
- Express - `npm install express --save`
- Mongo DB - https://www.mongodb.com/download-center?jmp=nav#community
- Mongoose - `npm install mongoose --save`

## APIs

- Spotify Web Api - https://developer.spotify.com/documentation/web-api/reference/
- Web Playback SDK - https://developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player-pause

## Client

- Angular 5.2.10

## Start mongo

* Create a data folder in the root of the app /music-catalog
* Run `mongod --dbpath {path to the data folder}`

## Star node and enable debbuging

* Run `npm install` in /server folder to install all the dependencies
* Run `node server.js`
* To debug Run `node ---inspect server.js`

## Star web app

* Run `npm install` in /web-app folder to install all the dependencies
* Run `npm run start`

## Commands

- `npm run start` for a **dev server**. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- `npm run build` to **build project**. Use the `--prod` flag for a production build.

- `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- `npm run lint`

- Prettier front-end code formatting:
  - `npm run format:prettier` - apply Prettier code formatting to all files in the listed folders.
  - `npm run format:fix` - apply `format:prettier` and `lint --fix` to all files in the `format:prettier` listed folders.
  - `npm run format:check` - check if some of the files in the listed folders do not fit Prettier formatting.
