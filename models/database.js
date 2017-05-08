import mongoose from 'mongoose';

let articleSchema = new mongoose.Schema({
  articleId: { type: Number, unique: true, index: true },
  title: String,
  abstract: String,
  content: String,
  category: String,
  tags: { type: String, default: 0 },
  author: String,
  createDate: Date,
  readTimes: { type: Number, default: 0},
  articleState: Number
})

let usersSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, index: true },
  userName: String,
  password: String,
  email: { type: String, unique: true},
  gender: Number,
  right: Number,
  userState: Number
})

let sessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, index: true },
  email: String
})

module.exports = {
  article: mongoose.model('article', articleSchema),
  users: mongoose.model('users', usersSchema),
  session: mongoose.model('session', sessionSchema)
};