const util      = require('util')
const pollModel = require('../models/mongoose-poll')

const log   = require('debug')('server:controllers-poll')
const error = require('debug')('server:error')

const getIndex = (req, res) => {
  res.send('API works')
}

const getAllPolls = (req, res) => {
  pollModel.findPolls((err, data) => {
      let pollArr
      {
        if (err) {
          error(err)
          return res.status(500).send({ message: 'Error retrieving Polls.' })
        }
        if (data) {
          log('Found polls ' + util.inspect(data))
          pollArr = data.map(poll => poll)
        }
      }
      res.send(pollArr)
  })
}

const getPoll = (req, res) => {
  pollModel.findPollById(req.params.id, (err, poll) => {
    if (err) {
      error(err)
      return res.status(500).send({ message: 'Error retrieving Poll details.' })
    }
    if (!poll) {
      return res.status(400).send({ message: 'Poll not found' })
    }
    log('Found poll ' + util.inspect(poll))
    res.send(poll)
  })
}

const makePoll = (req, res) => {
  pollModel.findOnePoll(
    {
      title: req.body.title,
      owner: req.body.owner
    }
  , (err, poll) => {
    if (err) {
      error(err)
      return res.status(500).send({ message: 'Error retrieving poll data.' })
    }
    if (poll) {
      return res.status(409).send({ message: 'You already created a poll with this title' })
    }
    pollModel.createPoll({
      title: req.body.title,
      options: req.body.options,
      owner: req.body.owner,
      voters: []
    }, (err, newPoll) => {
      if (err) {
        error(err)
        return res.status(500).send({ message: 'Error saving poll data.' })
      }
      return res.send(newPoll)
    })
  })
}

const votePoll = (req, res) => {
  pollModel.findPollById(req.params.id, (err, poll) => {
    if (err) {
      error(err)
      return res.status(500).send({ message: 'Error finding poll data.' })
    }
    if (!poll) {
      return res.status(400).message({ message: 'Poll not found.' })
    }
    poll.options.forEach(option => {
      if (option.title === req.body.option) {
        option.count = option.count+1
      }
    })
    if (process.env.NODE_ENV !== 'dev') {
      const notVoter = (x) => x !== req.body.voter
      const notVoted = poll.voters.every(notVoter)

      if (!notVoted) {
        return res.status(403).send({ message: 'You have already voted on this poll.' })
      }
    }
    poll.voters.push(req.body.voter)

    poll.save()
      .then((data) => {
        return res.send(data)
      })
      .catch((err) => {
        return res.status(500).send({ message: "Error saving poll data." })
      })
  })
}

const deletePoll = (req, res) => {
  pollModel.findPollById(req.params.id, (err, foundPoll) => {
    if (err) {
      return res.status(500).send({ message: 'Error retrieving poll data.' })
    }
    if (!foundPoll) {
      return res.status(400).send({ message: 'Poll not found.' })
    }
    foundPoll.remove((err) => {
      if (err) {
        return res.status(500).send({ message: 'Error deleting poll.' })
      }
      res.status(200).send({ message: 'Poll successfully deleted.' })
    })
  })
}

const getUserPolls = (req, res) => {
  pollModel.search({ owner: req.params.user }, (err, foundPolls) => {
    if (err) {
      return res.status(500).send({ message: "Error retrieving poll details." })
    }
    if (!foundPolls) {
      return res.status(400).send({ message: 'No polls found for this user.' })
    }
    res.send(foundPolls)
  })
}

module.exports = {
  getIndex,
  getAllPolls,
  getPoll,
  makePoll,
  votePoll,
  deletePoll,
  getUserPolls
}
