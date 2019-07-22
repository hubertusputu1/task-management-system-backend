import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

chai.use(chaiHttp)
chai.should()
describe("Products", () => {
    describe("GET /", () => {
        it("should get all products record", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200)
                     res.body.should.be.a('object')
                     done()
                  })
         })
        it("should get a single product record", (done) => {
             const id = 1
             chai.request(app)
                 .get(`/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200)
                     res.body.should.be.a('object')
                     done()
                  })
         })

        it("should not get a single product record", (done) => {
             const id = 5
             chai.request(app)
                 .get(`/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404)
                     done()
                  })
         })
    })
})