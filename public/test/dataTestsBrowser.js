import requester from 'requester';
import data from 'data';
// import encryptor from '../public/js/utils/encryptor';
import sinon from 'sinon';
import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('data layer tests', () => {
    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
    };

    // beforeEach(clearLocalStorage);
    // afterEach(clearLocalStorage);

    describe('User tests', () => {
        describe('Register tests', () => {
            console.log('1')
            let requesterPostStub;
            // let encryptorStub;

            const passHash = 'SOME_PASS_HASH';

            beforeEach(() => {
                requesterPostStub = sinon.stub(requester, 'postRequest');
            //     encryptorStub = sinon.stub(encryptor, 'encrypt')
            //         .returns(passHash);
            console.log('stub 1')
            });
            afterEach(() => {
            requesterPostStub.restore();
            // encryptorStub.restore()
            console.log('restore 1')
            });
            
            it('expect register to make a POST request', (done) => {
                console.log('2')
                const user = {
                    username: 'testuser',
                    passHash: '123456'
                }

                const response = {
                    result: {
                        username: user.username,
                        authKey: 'SOME_AUTHKEY'
                    }
                }

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        console.log('3')
                        expect(requesterPostStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expect register to make a a POST request to api/users', (done) => {
                const user = { 
                    ursername: 'testuser',
                    passHash: '123456'
                }

                const response = {
                    result: {
                        username: user.username,
                        authKey: 'SOME_AUTH_KEY'
                    }
                }

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        expect(requesterPostStub).to.have.been.calledWith('api/users')
                    })
                    .then(done, done);
            });

            it('expect register to make a POST request with user data (username)', (done) => {
                const user = {
                    username: 'testuser',
                    passHash: '123456'
                }

                const response = {
                    result: {
                        username: user.username,
                        authKey: 'SOME_AUTH_KEY'
                    }
                }

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        const expected = {
                                username: user.username,
                                passHash: user.passHash
                        };
                        expect(requesterPostStub.args[0][1].username).to.equal(expected.username);
                    })
                    .then(done, done);
            });

            it('expect register to make a POST request with users data (passHash)', (done) => {
                const user = { 
                    username: 'testuser',
                    passHash: '123456'
                }

                const response = {
                    rsult: {
                        username: user.username,
                        authKey: 'SOME_AUTH_KEY'
                    }
                }

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        const expected = {
                            username: user.username,
                            passHash: user.passHash
                        }

                        expect(requesterPostStub.args[0][1].passHash).to.equal(expected.passHash)
                    })
                    .then(done, done)
            })
        })
    })
})