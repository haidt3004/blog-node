require('dotenv').config()
const path = require('path')
const config = require('../config')
const log = require('../modules/common/log')
const { connect, importCollection } = require('../modules/common/mongodb')

before('init database', function () {
  log.info('init test database')
  this.timeout(10000)
  return initDatabase()
})

async function initDatabase() {
  const { con, db } = await connect(config.db.uri)
  var p1 = importCollection(db, getDataFile('blog.posts'))
  var p2 = importCollection(db, getDataFile('common.users'))
  await Promise.all([p1, p2])
  con.close()
}

function getDataFile(colName) {
  return path.resolve(__dirname, '..', '..', 'data', colName + '.json')
}

