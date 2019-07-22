import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'
import { config } from '../config'

chai.use(chaiHttp)
chai.should()
describe("Products", () => {
    describe("GET /products", () => {
        it("should get all products record", (done) => {
            chai.request(app)
            .get(`/${ config.API_PATH }/products/`)
            .end((err, res) => {
                console.log('ini error ', err);
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        })
    })
})