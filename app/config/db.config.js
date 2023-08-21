import db from './db.js'
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
  } catch (err) {
    console.error('Connection error', err)
    process.exit(1)
  }
}

export default {
  init
}
