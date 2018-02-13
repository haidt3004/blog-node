const { request, expect, getApiToken } = require('./common')

describe('POST /api/admin/session', function () {
  it('should return token when login success', function (done) {
    request
      .post('/api/admin/session')
      .send({
        'loginId': 'demo',
        'password': 'demo'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(resp => {
        var result = JSON.parse(resp.text)
        expect(result).to.have.property('token')
        expect(result).to.have.property('username')
      })
      .end(done)
  })
})

describe('GET /api/admin/account', function () {
  it('should return profile data', async function () {
    var token = await getApiToken()
    await request
      .get('/api/admin/account')
      .set('Authorization', `bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(resp => {
        var result = JSON.parse(resp.text)
        expect(result).to.have.property('username')
      })
  })
})

describe('PUT /api/admin/session', function () {
  it('should return updated profile data', async function () {
    var token = await getApiToken()
    await request
      .put('/api/admin/account')
      .set('Authorization', `bearer ${token}`)
      .send({
        'email': 'admin@m.mm',
        'username': 'admin1',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(resp => {
        var result = JSON.parse(resp.text)
        expect(result).to.have.property('username')
        expect(result.username).to.equal('admin1')
      })
  })
})
