const {User, Thought} = require('../models');

module.exports = {
  // Get all students
  getUsers(req, res) {
    User.find().then(user => res.json(user))
    .catch(err => res.status(500).json(err))
  },
  // Get a single student
  getSingleUser(req, res) {
    User.findOne({_id: req.params.userId})
    .populate('friends')
    .then(user => {
        if(!user){
            return res.status(404).json({msg: 'No user found'})
        }
        res.json(user)
    })
    .catch(err => res.status(500).json(err))
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userId})
    .then(user => {
        if(!user){
            return res.status(404).json({msg: 'No user found'})
        }
        res.json(user)
    })
    .catch(err => res.status(500).json(err))
  },

  // Add an assignment to a student
  addFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
};
