const validate = require('validate.js')

function validateLoginForm(data) {
  var rules = {
    loginId: {
      presence: { message: '^Username can\'t be blank' },
    },
    password: {
      presence: true,
    },
  }
  return validate(data, rules, { format: 'grouped' })
}

/**
 * validate and filter input from profile form
 * @param  object form input
 * @param  User mongoose user model
 * @return object list of validation errors or null
 */
function validateProfileData(data, user) {
  // function that perform password validation
  validate.validators.checkPassword = function (value, options, key, attributes) {
    if (value && !user.checkPassword(value))
      return 'is wrong'
    return null
  }

  // validation rules
  var rules = {
    username: {
      presence: true,
      length: { minimum: 3, maximum: 30 },
      format: {
        pattern: '[a-z0-9]+',
        flags: 'i',
        message: 'can only contain alphabet and numeric characters'
      }
    },
    email: {
      presence: true,
      email: true,
    },
    password: function (value, attributes, attributeName, options, constraints) {
      // only validate when value is not empty
      return value ? {
        length: { minimum: 6, maximum: 30 },
      } : false
    },
    currentPassword: function (value, attributes, attributeName, options, constraints) {
      // only validate when password is not empty
      return attributes.password ? {
        presence: true,
        checkPassword: true
      } : false
    }
  }

  return validate(data, rules)
}

module.exports = {
  validateLoginForm,
  validateProfileData,
}