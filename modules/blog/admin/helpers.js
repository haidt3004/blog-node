const validate = require('validate.js')

function validatePost(data) {
  var rules = {
    title: {
      presence: { message: '^Email can\'t be blank', allowEmpty: false },
    },
    content: {
      presence: { allowEmpty: false },
    },
  }
  return validate(data, rules)
}

module.exports = {
  validatePost
}