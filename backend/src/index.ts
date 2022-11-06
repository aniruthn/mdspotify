import express from "express";
import AuthRouter from "./services/auth"
import PlaybackRouter from "./services/playback"
import SearchRouter from "./services/search"
import PlaylistsRouter from "./services/playlists"
import Database from "better-sqlite3"
import { seedDB } from "./utils";
import { v5 } from 'uuid';

const app = express();
const port = process.env.PORT || 8080;

export const db = new Database("./../db/database.db")

// custom namespace, used to make a re-usable uuid generator function
const namespaceForUuid = '8bd9df1d-de06-4357-8fb6-b79d2255e5d0'
export const uuidGenerator = (input: string) => v5(input, namespaceForUuid)

seedDB(db)

// /route/:myparam accessed by req.params.myparam
// /route?myparam=something accessed by req.query.myparam

app.get("/", (_req, res) => {
  res.status(200)
  res.send({msg: "Hello world!"});
});

app.use('/auth', AuthRouter)
app.use('/playback', PlaybackRouter)
app.use('/search', SearchRouter)
app.use('/playlists', PlaylistsRouter)

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
