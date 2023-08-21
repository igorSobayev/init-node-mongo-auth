import mongoose from 'mongoose'

const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
})

export default mongoose.model('User', User)
