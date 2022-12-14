# Systems Design Query Workflows

## Architecture Diagram

![backend architecture diagram](./backend%20architecture%20diagram.jpeg)

## Features Supported

### Authentication

- Log In
- Log Out
- Sign Up
- External Providers

### Search

- Search for:
  - Songs
  - Albums
  - Artists
  - Playlists
  - Users

### Playback

- Click to trigger play
- Pause
- Scroll back/forward
- Next Song
- Previous Song
- View lyrics
- See time left/time elapsed

## Workflows

### Workflow 1: Logging in and listening to a song

User logs in, searches for Champions by Kanye West, Gucci Mane, Big Sean, 2 Chainz, Travis Scott, Yo Gotti, Quavo, Desiigner, clicks play

_UI:_

User is prompted to enter a username and password. Query is made to Auth service.

_Auth:_

Request: `/auth, { username: username, password: password }`

Query UserInfo by username and password being equal to the given parameters.

Create an object:

```TS
// HTTP get
const user = UserInfo.getUser(req.username, req.password)
const userFound = user ? { authenticated: true } : { authenticated: false }
```

Response:

```TS
send(userFound)
```

_UI:_

Given that the user has authenticated, `navigation.navigate('HomeScreen')` and the handler determines the user can now view the authenticated screens.

User types "Champions" into the search bar. Query is made to Search service.

_Search:_

Request: `/search, { searchText: "Champions" }`

Query Songs, Playlists, and Albums to see if there are any matches.

1. Query Songs

Create an object:

```TS
// HTTP get
const row: Row[] = Songs.searchFor(searchText)
const songResponse = row ? { song: row } : { song: null }
```

2. Query Playlists

Create an object:

```TS
// HTTP get
const row: Row[] = Songs.searchFor(searchText)
const songResponse = row ? { playlists: row } : { playlists: null }
```

3. Query Albums

Create an object:

```TS
// HTTP get
const row: Row[] = Albums.searchFor(req.searchText)
const albumResponse = row ? { albums: row } : { albums: null }
```

Response:

```TS
const serverResponse = {
    albums: albumResponse.albums,
    playlists: playlistResponse.playlists,
    songs: songResponse.songs
}
send(serverResponse)
```

_UI:_

Gets response back from Search service.

For each key in the response: if the value associated with that key is not null, then map over each of the given objects and display them.

Clicking on a given song opens up the details for that song using `navigation.navigate('SongDetailScreen', { song: selectedSong.UUID })`

Clicking the play button makes a query to the playback service.

_Playback:_

Request: `/play, { songToPlay: songUUID }`

Query songs, this time accessing only the audio file.

```TS
// HTTP get
const audioFile: Song = Songs.getByUUID(req.songToPlay)
```

Error Handling: if a song is not found, it will be set to null and the UI will show an error that the song cannot be played.

Response:

```TS
send(audioFile)
```

_UI:_

Pass in the given audio file into the `SongPlayer` component, with a default value set to play.

### Workflow 2: Make a new playlist and add Moonage Daydream by David Bowie

_UI_:

Click on button to create new playlist, making a query to the playlists service.

_Playlists:_

Request: `/createnewplaylist`

Create a new row in the Playlists database with a uuid that has already been generated for us (abstracted, assuming it's not already present in the database).

```TS
const newPlaylist = {
    UUID: autogeneratedUUID,
    songs: [],
    coverArt: '',
    description: ''
}
// HTTP post
const success = Playlists.addPlaylist(newPlaylist)
```

Response:

```TS
const playlistCreated = success ? { created: true } : { created: false }
send(playlistCreated)
```

_UI:_

Given the playlist that is created, send a song in to the Playlists service to add in the song.

_Playlists:_

Request: `/addtoplaylist, { playlist: playlistUUID, newSong: songUUID }`

Modify the current playlist row to add in the new song.

```TS
// HTTP post -> SQL UPDATE
const success = Playlists.addSongToPlaylist(playlistUUID, songUUID)
```

Response:

```TS
const playlistUpdated = success ? { created: true } : { created: false }
send(playlistUpdated)
```
