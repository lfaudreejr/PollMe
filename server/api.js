const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const Poll = require('./models/Poll')

/**
 * Auth middleware
 */
module.exports = function (app, config) {
  // Middleware for auth
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    aud: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  })

  /**
   * API Routes
   */

  // GET API Root
  app.get('/api/', (req, res) => {
    res.send('API works')
  })
  // GET all polls listed, limit 20
  app.get('/api/polls', (req, res) => {
    Poll.find({}, (err, polls) => {
      let pollArr = []
      {
        if (err) {
          return res.status(500).send({ message: err.message })
        }
        if (polls) {
          polls.forEach((poll) => {
            pollArr.push(poll)
          })
        }
      }
      res.send(pollArr)
    })
  })
  // GET poll details
  app.get('/api/poll/:id', (req, res) => {
    Poll.findById(req.params.id, (err, poll) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      if (!poll) {
        return res.status(400).send({ message: 'Poll not found' })
      }
      res.send(poll)
    })
  })

  // POST a new poll
  app.post('/api/poll/new', (req, res) => {
    Poll.findOne(
      {
        title: req.body.title,
        owner: req.body.owner
      },
      (err, existingPoll) => {
        if (err) {
          return res.status(500).send({ message: err.message })
        }
        if (existingPoll) {
          return res.status(409).send({ message: 'You already created a poll with this title' })
        }

        const poll = new Poll({
          title: req.body.title,
          options: req.body.options,
          owner: req.body.owner,
          voters: []
        })
        poll.save((err) => {
          if (err) {
            return res.status(500).send({ message: err.message })
          }
          res.send(poll)
        })
      }
    )
  })

  // POST a vote to existing Poll
  app.post('/api/poll/:id', (req, res) => {
    Poll.findById(req.params.id, (err, foundPoll) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      if (!foundPoll) {
        return res.status(400).message({ message: 'Poll not found.' })
      }

      for (let i = 0; i < foundPoll.options.length; i++) {
        if (foundPoll.options[i].title === req.body.option) {
          foundPoll.options[i].count = foundPoll.options[i].count + 1
        }
      }
      if (process.env.NODE_ENV !== 'dev') {
        for (let i = 0; i < foundPoll.voters.length; i++) {
          if (foundPoll.voters[i] === req.body.voter) {
            return res.status(403).send({ message: 'You have already voted on this poll.' })
          }
        }
      }
      foundPoll.voters.push(req.body.voter)
      foundPoll.save((err) => {
        if (err) {
          return res.status(500).send({ message: err.message })
        }
        res.send(foundPoll)
      })
    })
  })

  // DELETE a Poll option
  app.delete('/api/poll/:id', (req, res) => {
    Poll.findById(req.params.id, (err, foundPoll) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      if (!foundPoll) {
        return res.status(400).send({ message: 'Poll not found.' })
      }
      foundPoll.remove((err) => {
        if (err) {
          return res.status(500).send({ message: err.message })
        }
        res.status(200).send({ message: 'Poll successfully deleted.' })
      })
    })
  })

  // GET Polls for a user
  app.get('/api/:user/polls', (req, res) => {
    Poll.find({ owner: req.params.user }, (err, foundPolls) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      }
      if (!foundPolls) {
        return res.status(400).send({ message: 'No Polls found for this user.' })
      }
      res.send(foundPolls)
    })
  })
}
