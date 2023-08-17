import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'

import * as DB from './app/config/db.config.js'

const app = express()

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: "igor-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to igor's application." })
})

// routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
  next()
})
app.use('/api/auth', (await import("./app/routes/auth.routes.js")).default)
app.use('/api/test', (await import("./app/routes/user.routes.js")).default)

await DB.init()

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
