import Router from 'express'
import { db } from "./../index"
import SongRow from "../models/SongRow"

const PlaybackRouter = Router()

PlaybackRouter.get('/', (_, res) => {
    const statement = db.prepare('SELECT * FROM Songs;')
    const result = statement.all()
    res.statusCode = 200
    res.send(result)
})

PlaybackRouter.get('/:songUuid', (req, res) => {
    const { songUuid } = req.params
    if (!songUuid) {
        res.statusCode = 404
        res.send({})
        return
    }
    const song: SongRow | undefined = db.prepare('SELECT * FROM Songs WHERE uuid = ?;').get(songUuid)
    if (!song) {
        res.statusCode = 404
        res.send({})
        return
    }
    res.statusCode = 200
    res.sendFile( song.audioFile, { root: './../db/files' })
})

export default PlaybackRouter