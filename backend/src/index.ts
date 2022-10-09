// ts prefers imports over require
import express from "express";
import AuthRouter from "./services/auth"
import PlaybackRouter from "./services/playback"
import SearchRouter from "./services/search"
import PlaylistsRouter from "./services/playlists"
import Database from "better-sqlite3"
const app = express();
const port = process.env.PORT || 8080;

export const db = new Database("./../db/database.db")

const pragmaStatement = db.prepare("SELECT name FROM (SELECT * FROM sqlite_schema UNION ALL SELECT * FROM sqlite_temp_schema) WHERE type='table' ORDER BY name")
const value = pragmaStatement.get() // will be undefined if not present

if (!value?.name || value.name !== "UserInfo") {
  db.prepare('CREATE TABLE IF NOT EXISTS UserInfo (username TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL);').run()

  const insertIntoUserInfo = db.prepare('INSERT INTO UserInfo(username, password) VALUES(?, ?);')
  insertIntoUserInfo.run("mom", "dad")
}

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
