import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.ROLES = ['user', 'admin', 'moderator']

export default db
