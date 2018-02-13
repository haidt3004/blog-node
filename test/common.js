const chai = require('chai')
const expect = chai.expect
const supertest = require('supertest')
const server = require('../index')
const request = supertest(server)
const log = require('../modules/common/log')
const User = require('../modules/common/models/user')
var token = undefined

async function getApiToken() {
  if (token === undefined) {
    try {
      var user = await User.findOne()
      token = user.createToken().value
    } catch (error) {
      log.error('Error while generating access token')
      throw error
    }
  }

  return token
}

module.exports = {
  expect, request, getApiToken
}
