import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      { username: 'maya.chen', email: 'maya.chen@mergington.edu', displayName: 'Maya Chen', grade: 11, points: 420 },
      { username: 'jordan.rivera', email: 'jordan.rivera@mergington.edu', displayName: 'Jordan Rivera', grade: 10, points: 365 },
      { username: 'sam.okafor', email: 'sam.okafor@mergington.edu', displayName: 'Sam Okafor', grade: 12, points: 510 },
      { username: 'riley.patel', email: 'riley.patel@mergington.edu', displayName: 'Riley Patel', grade: 9, points: 290 },
    ])

    const teams = await Team.insertMany([
      { name: 'Trailblazers', mascot: 'Mountain Lion', color: '#1f7a8c', members: [users[0]._id, users[1]._id] },
      { name: 'Power Squad', mascot: 'Falcon', color: '#e07a5f', members: [users[2]._id, users[3]._id] },
    ])

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 4.8, calories: 335, points: 80, recordedAt: new Date('2026-08-22T16:30:00Z') },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 12.4, calories: 410, points: 95, recordedAt: new Date('2026-08-23T17:00:00Z') },
      { user: users[2]._id, type: 'strength', durationMinutes: 38, calories: 280, points: 90, recordedAt: new Date('2026-08-24T15:45:00Z') },
      { user: users[3]._id, type: 'walking', durationMinutes: 50, distanceKm: 3.6, calories: 220, points: 60, recordedAt: new Date('2026-08-24T16:15:00Z') },
    ])

    await Leaderboard.insertMany([
      { user: users[2]._id, team: teams[1]._id, points: 510, rank: 1, period: 'August 2026' },
      { user: users[0]._id, team: teams[0]._id, points: 420, rank: 2, period: 'August 2026' },
      { user: users[1]._id, team: teams[0]._id, points: 365, rank: 3, period: 'August 2026' },
      { user: users[3]._id, team: teams[1]._id, points: 290, rank: 4, period: 'August 2026' },
    ])

    await Workout.insertMany([
      { title: 'After-School Endurance', category: 'cardio', difficulty: 'beginner', durationMinutes: 25, exercises: [' brisk walk', 'jog intervals', 'cooldown stretch'], target: 'Build steady cardiovascular fitness' },
      { title: 'Strong Foundations', category: 'strength', difficulty: 'intermediate', durationMinutes: 30, exercises: ['squats', 'push-ups', 'lunges', 'plank'], target: 'Develop full-body strength' },
      { title: 'Reset and Recover', category: 'mobility', difficulty: 'beginner', durationMinutes: 15, exercises: ['hip circles', 'cat-cow', 'hamstring stretch'], target: 'Improve mobility after activity' },
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    await mongoose.disconnect()
    process.exitCode = 1
  }
}

seedDatabase()
