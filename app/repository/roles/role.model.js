import mongoose from 'mongoose'

const Role = new mongoose.Schema({
  name: String
})

export default mongoose.model('Role', Role)
