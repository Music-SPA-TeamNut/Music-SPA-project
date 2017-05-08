describe('Data layer tests', () => {
describe('Register tests', () => {
    it('Expect URL to be api/users', (done) => {
        const user = {
            email:'test@email.com',
            username:'testuser',
            passHash:'a6c35c7283652272aa933d35b84c2dd352680f5ec729c949218643ed53b98724'
        };
    
        sinon.stub(requester, 'post')
            .returns(new Promise.resolve());

        data.register(user)
            .then(() => {
                expect(requester.post).to.have.been.calledOnce();
            });

        requester.post.restore();
    });
});
});