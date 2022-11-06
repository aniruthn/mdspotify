import { Database } from "better-sqlite3";
import fs from "fs";
import { uuidGenerator } from "./index";
import UserInfoRow from "./models/UserInfoRow";

const usersInDB: UserInfoRow[] = [
  {
    username: "mom",
    password: "dad"
  },
  {
    username: "user1",
    password: "password1"
  }
]

/**
 * seeds DB with sample data if tables do not already exist
 * @param db Database connection to avoid unnecessary imports/new connections
 */
export const seedDB = (db: Database) => {
  const pragmaStatement = db.prepare("SELECT name FROM (SELECT * FROM sqlite_schema UNION ALL SELECT * FROM sqlite_temp_schema) WHERE type='table' ORDER BY name")
  const tables = pragmaStatement.all().map((val) => val.name)

  if (!tables.includes("UserInfo")) {
    db.prepare('CREATE TABLE IF NOT EXISTS UserInfo (username TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL);').run()

    const insertIntoUserInfo = db.prepare('INSERT INTO UserInfo(username, password) VALUES(?, ?);')
    usersInDB.forEach((user) => {
      const { username, password } = user
      const hashedPassword = cyrb53(password)
      insertIntoUserInfo.run(username, hashedPassword)
    })
  }
  if (!tables.includes("Songs")) {
    db.prepare('CREATE TABLE IF NOT EXISTS Songs (uuid TEXT NOT NULL PRIMARY KEY, title TEXT NOT NULL, audioFile TEXT NOT NULL, artist TEXT NOT NULL, features TEXT NOT NULL, album TEXT NOT NULL, coverArt TEXT NOT NULL);').run()
    const filesTxt = fs.readFileSync("./../db/files.txt", "utf-8")
      .split("\n")
      .filter((line) => line.length !== 0 && line[0] != "#")
      .map((file) => file.split(",").map((item) => item.trim()))
    
    const insertIntoSongs = db.prepare('INSERT INTO Songs(uuid, title, audioFile, artist, features, album, coverArt) VALUES(?, ?, ?, ?, ?, ?, ?)')
    let writeFile = ''
    filesTxt.forEach((file) => {
      const [audioFile, title, artist, features, album, coverArt] = file
      const uuid = uuidGenerator(`${title},${artist}`)
      insertIntoSongs.run(uuid, title, audioFile, artist, features, album, coverArt)
      writeFile = writeFile.concat('# title: ', title, ' artist: ', artist, ' features: ', features, '\n').concat('# uuid: ', uuid, '\n')
    })
    // helper file to test server api sending mp3s directly; see get(/playback/:songUuid)
    fs.writeFileSync("./../db/uuid.txt", writeFile)
  }
  if (!tables.includes("Playlists")) {
    db.prepare('CREATE TABLE IF NOT EXISTS Playlists (uuid TEXT NOT NULL PRIMARY KEY, songs TEXT NOT NULL, coverArt TEXT NOT NULL, description TEXT NOT NULL);').run()
  }
}

/**
 * from https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 * @param str string to hash
 * @param seed optional
 * @returns hashed str given seed
 */
export const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return ((4294967296 * (2097151 & h2) + (h1 >>> 0)) % 1000000000).toString(10);
  };
