import Router from 'express'
import { db } from "./../index"

const AuthRouter = Router()

AuthRouter.get('/signin', (req, res) => {
    const { username, password } = req.query
    const statement = db.prepare(`SELECT * FROM UserInfo WHERE username = ? AND password = ?;`)
    const result = statement.get(username, password)
    if (result) {
        res.statusCode = 200
        res.send(result)
    } else {
        res.statusCode = 401
        res.send({})
    }
})

export default AuthRouter