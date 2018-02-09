const PollController = require('./controllers/Poll')
const jwtCheck = require('./middleware/jwks')

module.exports = function (app, config) {

  /**
   * API Routes
   */

  // GET API Root
  app.get(
    '/api/',
    PollController.getIndex
  )

  // GET all polls listed, limit 20
  app.get(
    '/api/polls',
    PollController.getAllPolls
  )
  // GET poll details
  app.get(
    '/api/poll/:id',
    PollController.getPoll
  )

  // POST a new poll
  app.post(
    '/api/poll/new',
    jwtCheck,
    PollController.makePoll
  )

  // POST a vote to existing Poll
  app.put(
    '/api/poll/:id',
    PollController.votePoll
  )

  // DELETE a Poll option
  app.delete(
    '/api/poll/:id',
    jwtCheck,
    PollController.deletePoll
  )

  // GET Polls for a user
  app.get(
    '/api/:user/polls',
    jwtCheck,
    PollController.getUserPolls
  )
}
