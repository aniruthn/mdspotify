import Router from 'express'
import { db } from "./../index"
import { cyrb53 } from '../utils'
import UserInfoRow from "../models/UserInfoRow"

const AuthRouter = Router()

AuthRouter.get('/signin', (req, res) => {
    const { username, password } = req.query
    const hashedPassword = cyrb53(password.toString()).toString(10)
    const statement = db.prepare(`SELECT * FROM UserInfo WHERE username = ? AND password = ?;`)
    const result = statement.get(username.toString(), hashedPassword)
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

AuthRouter.put('/createUser', (req, res) => {
    const userInfo = req.query as any as UserInfoRow
    res.send({})
})

export default AuthRouter