// ts prefers imports over require
import express from "express";
import AuthRouter from "./services/auth"
import PlaybackRouter from "./services/playback"
import SearchRouter from "./services/search"
import PlaylistsRouter from "./services/playlists"
import Database from "better-sqlite3"
import { seedDB } from "./utils";

const app = express();
const port = process.env.PORT || 8080;

export const db = new Database("./../db/database.db")

seedDB(db)

// /route/:myparam accessed by req.params.myparam
// /route?myparam=something accessed by req.query.myparam

app.get("/", (_req, res) => {
  res.status(200)
  res.send("Hello world!");
});

app.use('/auth', AuthRouter)
app.use('/playback', PlaybackRouter)
app.use('/search', SearchRouter)
app.use('/playlists', PlaylistsRouter)

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
