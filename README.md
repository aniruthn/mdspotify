# MDSpotify

![backend architecture diagram](./backend%20architecture%20diagram.jpeg)

This project was built during the MDB Training Program, Fall 2022. It's inspired by the key features of Spotify.

This project uses:

- React Native (managed by Expo) for the mobile frontend
- Node/Express for the backend server
- Redux (Toolkit) for the frontend state management
- SQL (SQLite3) for the database
- TypeScript for the language throughout

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

Both the frontend and backend have live reloading and TypeScript support; the frontend uses Expo and the backend uses nodemon and ts-node.

## Workflows

Check out some [sample workflows](./systems-design-queries.md) to see how the backend architecture was designed.
