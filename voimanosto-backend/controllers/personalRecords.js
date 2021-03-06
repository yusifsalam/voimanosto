const prRouter = require('express').Router({ mergeParams: true })
const utils = require('../utils/middleware')
const User = require('../models/user')
const PR = require('../models/personalRecord')
const Exercise = require('../models/exercise')

prRouter.get('/:current', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      let prs

      if (req.params.current === 'current') {
        prs = await PR.aggregate([
          {
            $match: {
              user: user._id,
              isCurrentPR: true
            }
          },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      } else if (req.params.current === 'all') {
        prs = await PR.aggregate([
          {
            $match: {
              user: user._id
            }
          },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      }
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

prRouter.get('/:type/:current', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      let prs
      if (req.params.current === 'current') {
        prs = await PR.aggregate([
          { $match: { user: user._id, isCurrentPR: true } },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          { $match: { 'exercise.type': req.params.type } },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      } else if (req.params.current === 'all') {
        prs = await PR.aggregate([
          { $match: { user: user._id } },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          { $match: { 'exercise.type': req.params.type } },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      }
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

prRouter.get('/:type/:name/:current', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      let prs
      if (req.params.current === 'current') {
        prs = await PR.aggregate([
          { $match: { user: user._id, isCurrentPR: true } },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          {
            $match: {
              'exercise.type': req.params.type,
              'exercise.name': req.params.name
            }
          },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      } else if (req.params.current === 'all') {
        prs = await PR.aggregate([
          { $match: { user: user._id } },
          {
            $lookup: {
              from: 'exercises',
              localField: 'exercise',
              foreignField: '_id',
              as: 'exercise'
            }
          },
          { $unwind: '$exercise' },
          {
            $match: {
              'exercise.type': req.params.type,
              'exercise.name': req.params.name
            }
          },
          {
            $sort: {
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1,
              reps: 1,
              weight: -1
            }
          },
          {
            $project: {
              date: 1,
              reps: 1,
              weight: 1,
              'exercise.type': 1,
              'exercise.name': 1,
              'exercise.variation': 1
            }
          }
        ])
      }
      res.json(prs)
    } catch (exception) {
      next(exception)
    }
  }
})

prRouter.get('/:type/:name/:variation/:current', async (req, res, next) => {
  const verified = await utils.verifyIdentity(req)
  if (verified !== true) {
    res.status(401).json({ error: verified })
  } else {
    try {
      const user = await User.findOne({ username: req.params.username })
      const exercise = await Exercise.findOne({
        type: req.params.type,
        name: req.params.name,
        variation: req.params.variation,
        user: user._id
      })
      const pr = await PR.findOne({
        exercise: exercise._id,
        reps: 1,
        isCurrentPR: true
      })
      res.json(pr.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

module.exports = prRouter
