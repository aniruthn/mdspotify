import { Database } from "better-sqlite3";

const usersInDB = [
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
  const value = pragmaStatement.get() // will be undefined if not present

  if (!value?.name || value.name !== "UserInfo") {
    db.prepare('CREATE TABLE IF NOT EXISTS UserInfo (username TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL);').run()

    const insertIntoUserInfo = db.prepare('INSERT INTO UserInfo(username, password) VALUES(?, ?);')
    usersInDB.forEach((user) => {
      const { username, password } = user
      const hashedPassword = cyrb53(password)
      insertIntoUserInfo.run(username, hashedPassword)
    })
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
