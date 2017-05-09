const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

var jsonRequesterPutStub;
var user = {
    username: 'lambi',
    password: '1111'
}

beforeEach(() => {


});
afterEach(() => {

});

describe('Data layer tests', () => {
    it('Login should make a put request', ( /*done*/ ) => {
        // data.register(user)
        //     .then(() => {
        //         expect(jsonRequesterPutStub).to.have.been.calledOnce;
        //     })
        //     .then(done, done);
    });
    it('hhaha', () => {


    });
});