const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const workoutsRouter = require('./workouts')
const bodyweightsRouter = require('./bodyweights')
const prRouter = require('./personalRecords')
const exercisesRouter = require('./exercises')
const exerciseBase = require('../utils/defaultExercises')
const statsRouters = require('./stats')
const notificationsRouter = require('./notifications')
const competitionsRouter = require('./competitions')
const profilePictureRouter = require('./profilePicture')
const utils = require('../utils/middleware')

usersRouter.use('/:username/workouts', workoutsRouter)
usersRouter.use('/:username/bodyweight', bodyweightsRouter)
usersRouter.use('/:username/prs', prRouter)
usersRouter.use('/:username/exercises', exercisesRouter)
usersRouter.use('/:username/stats', statsRouters)
usersRouter.use('/:username/notifications', notificationsRouter)
usersRouter.use('/:username/competitions', competitionsRouter)
usersRouter.use('/:username/profile_pic', profilePictureRouter)

usersRouter.post('/', async (req, res, next) => {
  try {
    const usersInDb = await User.count({})
    if (usersInDb >= 50) {
      return res.status(403).json({
        error: 'User limit reached. Registration is closed for now'
      })
    }
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      email: body.email,
      avatar: 'default',
      passwordHash,
      workouts: [],
      exercises: [],
      notifications: [],
      competitions: [],
      stats: []
    })
    const savedUser = await user.save()
    const exercises = await exerciseBase(savedUser._id)
    savedUser.exercises = savedUser.exercises.concat(exercises)
    const updatedUser = await savedUser.save()
    res.json(updatedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const userToken = utils.decodeUser(req)
    const user = await User.findById(userToken.id)
    if (user.isAdmin) {
      const users = await User.find({})
      res.json(users.map(u => u.toJSON()))
    } else {
      res.json({ error: 'Only admins can get user list' })
    }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:username', async (req, res, next) => {
  try {
    const userToken = utils.decodeUser(req)
    const user = await User.findById(userToken.id)
    if (user.isAdmin || user.username === req.params.username) {
      const newUser = await User.findOne({ username: req.params.username })
      res.json(newUser.toJSON())
    } else {
      res.json({ error: 'You are not authorized!' })
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
