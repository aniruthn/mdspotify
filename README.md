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

## Ideas for Functionality

The following are a subset of ideas pitched by newbies for features to potentially add to MDSpotify:

- DJ interface
- Filter button by different genres in a playlist
- Group playlists with people voting on songs to adjust the list
- Toggle for instrumental versions of music for karaoke

## Miscellaneous Notes

### Security

Note that the authentication system here can be spoofed. Here's how it would happen:

- To initially sign in, the outgoing network request has to be intercepted. An object with a non-zero number of keys has to be returned. Tricky, but possible.
- All subsequent requests will succeed, since the local state of the application maintains that the user signs in.

Here's the fix:

- All requests should check that the user is authenticated.
- This needs to happen on the backend, and should sign out the user _if_ there is not a valid user.

I might fix this soon - in which case the code would be updated.
