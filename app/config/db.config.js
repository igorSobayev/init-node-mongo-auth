import db from './db.js'
import Role from '../repository/roles/role.model.js'
export async function init() {
  const dbConfig = {
    HOST: process.env.HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.DB // TODO change to ur DB
  }
  
  try {
    await db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Successfully connect to MongoDB.')
    initial()
  } catch (err) {
    console.error('Connection error', err)
    process.exit(1)
  }

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: 'user'
        }).save(err => {
          if (err) {
            console.log('error', err)
          }
  
          console.log(`added 'user' to roles collection`)
        })
  
        new Role({
          name: 'moderator'
        }).save(err => {
          if (err) {
            console.log('error', err)
          }
  
          console.log(`added 'moderator' to roles collection`)
        })
  
        new Role({
          name: 'admin'
        }).save(err => {
          if (err) {
            console.log('error', err)
          }
  
          console.log(`added 'admin' to roles collection`)
        })
      }
    })
  }
}

export default {
  init
}
