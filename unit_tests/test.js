const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./test_server.js"); // Update this path to where your server is started.
const expect = chai.expect;

chai.use(chaiHttp);

/* eslint-env mocha */
describe("Test results API", () => {
  it("should store test result", (done) => {
    const testData = {
      user: "TestUser",
      testType: "depression",
      testScore: 15,
      severity: "moderate",
      time: new Date().toISOString(),
    };

    chai
      .request(server)
      .post("/test")
      .send(testData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("Test completed successful");
        done();
      });
  });
});
