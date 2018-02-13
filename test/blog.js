const { request, expect } = require('./common')

describe('GET /api/posts', function () {
  it('should return array of posts', async function () {
    await request
      .get('/api/posts')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(resp => {
        var result = JSON.parse(resp.text)
        expect(result).to.be.an('array')
        expect(result.length).to.not.equal(0, 'No posts found. Please use test database with sample data')
      })
  })
})

describe('GET /api/posts/:id', function () {
  it('should return post data', async function () {
    // post id come from test data
    var id = '5a45f0f86ed4eb04b810ebb6'
    await request
      .get(`/api/posts/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(resp => {
        var result = JSON.parse(resp.text)
        expect(result).to.have.property('_id')
        expect(result._id).to.equal(id)
      })
  })
})