# MDSpotify

![backend architecture diagram](./backend%20architecture%20diagram.jpeg)

This project was built during the MDB Training Program, Fall 2022. It's inspired by the key features of Spotify.

This project uses:

- React Native (managed by Expo)
- Node/Express
- Sqlite3
- Typescript

## Local Setup

```
cd mobile
yarn install
expo install
expo start
```

```
cd backend
yarn install
yarn start
```

Ideally, this project would contain one set of shared packages. However, since `yarn create expo-app` was used to setup the mobile frontend, it's far easier to just create separate folders.
