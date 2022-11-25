import Router from 'express'
import SongRow from '../../../shared/models/SongRow'
import PlaylistRow from '../../../shared/models/PlaylistRow'
import { db } from "./../index"

const SearchRouter = Router()

const searchThroughTable = (searchTerm: string, tableName: string, columnsToSearchBy: string[]) => {
    const columnsToSearchByProcessed = columnsToSearchBy.map((column) => `${column} LIKE '%${searchTerm}%'`).join(" OR ")
    return db.prepare(`SELECT * FROM ${tableName} WHERE ${columnsToSearchByProcessed};`).all()
}

// todo: add searching for albums directly
SearchRouter.get('/', (req, res) => {
    const { searchTerm } = req.query as { searchTerm: string }
    const songSearchResults: SongRow[] = searchThroughTable(searchTerm, "Songs", ["title", "artist", "features", "album"])
    const playlistSearchResults: PlaylistRow[] = searchThroughTable(searchTerm, "Playlists", ["name", "description"])
    res.send({ songSearchResults, playlistSearchResults })
})

SearchRouter.get('/song', (req, res) => {
    const { searchTerm } = req.query as { searchTerm: string }
    const songSearchResults: SongRow[] = searchThroughTable(searchTerm, "Songs", ["title", "artist", "features", "album"])
    res.send({ songSearchResults })
})

export default SearchRouter