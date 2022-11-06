// use the WHERE column LIKE pattern to search
import Router from 'express'
import SongRow from '../models/SongRow'
import { db } from "./../index"

const SearchRouter = Router()

// search: search by a few things
// songs: search by: title, artist, features, album
// playlists: search by: name, songs - coming later
// albums (no direct database, but we can groupby album on songs) - ignore for now

SearchRouter.get('/song', (req, res) => {
    const { searchTerm } = req.query
    const columnsToSearchBy = ["title", "artist", "features", "album"]
    const columnsToSearchByProcessed = columnsToSearchBy.map((column) => `${column} LIKE '%${searchTerm}%'`).join(" OR ")
    const songSearchResults: SongRow[] = db.prepare(`SELECT * FROM Songs WHERE ${columnsToSearchByProcessed};`).all()
    console.log(songSearchResults);
    if (songSearchResults.length === 0) {
        res.statusCode = 404
    } else {
        res.statusCode = 200
    }
    res.send({ songSearchResults })
})

export default SearchRouter