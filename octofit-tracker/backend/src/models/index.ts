import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  grade: { type: Number, required: true, min: 9, max: 12 },
  points: { type: Number, default: 0, min: 0 },
}, {
  timestamps: true,
})

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mascot: { type: String, required: true },
  color: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
})

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['running', 'walking', 'cycling', 'strength'] },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  calories: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, required: true },
}, {
  timestamps: true,
})

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, required: true },
}, {
  timestamps: true,
})

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['cardio', 'strength', 'mobility'] },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true, min: 1 },
  exercises: [{ type: String, required: true }],
  target: { type: String, required: true },
}, {
  timestamps: true,
})

export const User = mongoose.model('User', userSchema)
export const Team = mongoose.model('Team', teamSchema)
export const Activity = mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.model('Workout', workoutSchema)