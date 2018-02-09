const Poll = require('../models/Poll')

const getIndex = (req, res) => {
  res.send('API works')
}

const getAllPolls = (req, res) => {
  Poll.find({}, (err, polls) => {
    let pollArr = []
    {
      if (err) {
        return res.status(500).send({ message: 'Error retrieving Polls.' })
      }
      if (polls) {
        polls.forEach((poll) => {
          pollArr.push(poll)
        })
      }
    }
    res.send(pollArr)
  })
}

const getPoll = (req, res) => {
  Poll.findById(req.params.id, (err, poll) => {
    if (err) {
      return res.status(500).send({ message: 'Error retrieving Poll details.' })
    }
    if (!poll) {
      return res.status(400).send({ message: 'Poll not found' })
    }
    res.send(poll)
  })
}

const makePoll = (req, res) => {
  Poll.findOne(
    {
      title: req.body.title,
      owner: req.body.owner
    },
    (err, existingPoll) => {
      if (err) {
        return res.status(500).send({ message: 'Error retrieving poll data.' })
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
          return res.status(500).send({ message: 'Error saving poll data.' })
        }
        res.send(poll)
      })
    }
  )
}

const votePoll = (req, res) => {
  Poll.findById(req.params.id)
    .then(foundPoll => {
      if (!foundPoll) {
        return res.status(400).message({ message: 'Poll not found.' })
      }
      foundPoll.options.forEach(option => {
        if (option.title === req.body.option) {
          option.count = option.count+1
        }
      })

      if (process.env.NODE_ENV !== 'dev') {
        const notVoter = (x) => x !== req.body.voter
        const notVoted = foundPoll.voters.every(notVoter)

        if (!notVoted) {
          return res.status(403).send({ message: 'You have already voted on this poll.' })
        }
      }

      foundPoll.voters.push(req.body.voter)

      foundPoll.save()
        .then((data) => {
          return res.send(data)
        })
        .catch((err) => {
          return res.status(500).send({ message: "Error saving poll data." })
        })

    })
    .catch(err => {
      return res.status(500).send({ message: "Error retrieving poll data." })
    })

}

const deletePoll = (req, res) => {
  Poll.findById(req.params.id, (err, foundPoll) => {
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
  Poll.find({ owner: req.params.user }, (err, foundPolls) => {
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
