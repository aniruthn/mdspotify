import Router from 'express'
import { db } from "./../index"
import { cyrb53 } from '../utils'
import UserInfoRow from "../models/UserInfoRow"

const AuthRouter = Router()

AuthRouter.get('/signin', (req, res) => {
    const { username, password } = req.query as any as UserInfoRow
    if (!username || !password) {
        res.statusCode = 400
        res.send({})
    }
    const hashedPassword = cyrb53(password)
    const statement = db.prepare(`SELECT * FROM UserInfo WHERE username = ? AND password = ?;`)
    const result = statement.get(username, hashedPassword)
    if (result) {
        res.statusCode = 200
        res.send(result)
    } else {
        res.statusCode = 401
        res.send({})
    }
})

AuthRouter.put('/signout', (req, res) => {
    // does anything need to go here?
    // do we need to track whether a user has signed in/out?
    // can a user sign in from multiple devices at once?
})

AuthRouter.post('/createUser', (req, res) => {
    const userInfo = req.query as any as UserInfoRow
    const { username, password } = userInfo
    if (!username || !password) {
        res.statusCode = 400
        res.send({})
    }
    const hashedPassword = cyrb53(password)
    const statement = db.prepare('INSERT INTO UserInfo VALUES(?, ?);')
    const result = statement.run(username, hashedPassword)
    if (result) {
        res.statusCode = 200
        res.send(result)
    } else {
        res.statusCode = 401
        res.send({})
    }
})

// for debugging ease
AuthRouter.get('/allUsers', (_, res) => {
    const statement = db.prepare('SELECT * FROM UserInfo;')
    const result = statement.all()
    res.statusCode = 200
    res.send(result)
})

export default AuthRouter