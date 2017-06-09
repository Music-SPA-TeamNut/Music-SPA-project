import requester from '../public/js/app/requester';
import data from '../public/js/app/data';
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
        // USER Register tests
        describe('Register tests', () => {
            let requesterPostStub;
            // let encryptorStub;

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

            beforeEach(() => {
                requesterPostStub = sinon.stub(requester, 'postRequest');
            //     encryptorStub = sinon.stub(encryptor, 'encrypt')
            //         .returns(passHash);
            });
            afterEach(() => {
            requesterPostStub.restore();
            // encryptorStub.restore()
            });
            
            it('expect register to make a POST request', (done) => {

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        expect(requesterPostStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expect register to make a a POST request to api/users', (done) => {

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        expect(requesterPostStub).to.have.been.calledWith('api/users');
                    })
                    .then(done, done);
            });

            it('expect register to make a POST request with user data (username)', (done) => {

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

            // TO BE MOVED IN THE USERS CONTROLLER TESTS

            // it('expect register to make a call to encryptor.encrypt() once', (done) => {
            //     const user = {
            //         username: 'testuser',
            //         passHash: '123456'
            //     }

            //     const response = {
            //         result: {
            //             username: user.username,
            //             authKey: 'SOME_AUTH_KEY'
            //         }
            //     }

            //     requesterPostStub.returns(Promise.resolve(response));

            //     data.register(user)
            //         .then(() => {
            //             expect(encryptorStub).to.have.been.calledOnce;
            //         })
            //         .then(done, done);
            // });

            // it('expect register to make a call to encryptor.encrypt() with the correct parameters', (done) => {
            //     const user = {
            //         username: 'testuser',
            //         passHash: '123456'
            //     }

            //     const response = {
            //         result: {
            //             username: user.username,
            //             authKey: 'SOME_AUTH_KEY'
            //         }
            //     }

            //     requesterPostStub.returns(Promise.resolve(response));

            //     data.register(user)
            //         .then(() => {
            //             expect(encryptorStub).to.have.been.calledWith(password)
            //         })
            // })

            it('expect register to make a POST request with user data (passHash)', (done) => {

                requesterPostStub.returns(Promise.resolve(response));

                data.register(user)
                    .then(() => {
                        const expected = {
                            username: user.username,
                            passHash: user.passHash
                        }

                        expect(requesterPostStub.args[0][1].passHash).to.equal(expected.passHash);
                    })
                    .then(done, done)
            });

            it('expecty register to return a Promise', () => {

                requesterPostStub.returns(Promise.resolve(response));
                const promise = data.register(user);
                expect(promise).to.be.an.instanceof(Promise);
            });

            it('register to treturn a Promise which resolves with registered username', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.register(user)
                .then((result) => {
                    expect(result.result.username).to.equal(user.username);
                })
                .then(done, done);
        });

        // TO BE DONE LOCAL_STORAGE TESTS IN THE BROWSER
    });
    
        // USER Login tests
        describe('Login tests', () => {
            let requesterPutStub;
            const user = {
                username: 'testuser',
                password: '123456'
            }

            const response = {
                result: {
                    username: user.username,
                }
            }

            beforeEach(() => {
                requesterPutStub = sinon.stub(requester, 'putRequest');
            });

            afterEach(() => {
                requesterPutStub.restore();
            });

            it('expects login to make a PUT request', (done) => {
                requesterPutStub.returns(Promise.resolve(response));
                data.login(user)
                    .then(() => {
                         expect(requesterPutStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expects login to make a PUT request to api/users/auth', (done) => {
                requesterPutStub.returns(Promise.resolve(response));
                data.login(user)
                    .then(() => {
                         expect(requesterPutStub).to.have.been.calledWith('api/users/auth');
                    })
                    .then(done, done);
            });

            it('expects login to make a PUT request with user data (username)', (done) => {
                requesterPutStub.returns(Promise.resolve(response));
                data.login(user)
                    .then(() => {
                        const expected = {
                            username: user.username,
                            passHash: user.passHash
                        }
                        expect(requesterPutStub.args[0][1].username).to.equal(expected.username);
                    })
                    .then(done, done);
            });

            it('expects login to make a PUT request with user data (passhash)', (done) => {
                requesterPutStub.returns(Promise.resolve(response));
                data.login(user)
                    .then(() => {
                        const expected = {
                            username: user.username,
                            passHash: user.passHash
                        }
                        expect(requesterPutStub.args[0][1].passHash).to.equal(expected.passhash);
                    })
                    .then(done, done);
            });

            it('expects login to return a Promise', () => {
                requesterPutStub.returns(Promise.resolve(response));
                const promise = data.login(user);

                expect(promise).to.be.an.instanceof(Promise);
            });

            it('expects login to return a Promise that resolves with login username', (done) => {
                requesterPutStub.returns(Promise.resolve(response));
                data.login(user)
                    .then((result) => {
                        expect(result.result.username).to.equal(user.username);
                    })
                    .then(done, done);
            });
        });
    });

    describe('Search tests', () => {
            let requesterGetStub;
            const response = {

            }

            const searchTerm = 'SearchTerm';

            beforeEach(() => {
                requesterGetStub = sinon.stub(requester, 'getRequest');
            });

            afterEach(() => {
                requesterGetStub.restore();
            })

            it('expect search to make a GET request', (done) => {

                requesterGetStub.returns(Promise.resolve(response));

                data.search(searchTerm)
                    .then(() => {
                        expect(requesterGetStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            })

            it('expect search to make a GET request to (url)', (done) => {
                const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0'

                requesterGetStub.returns(Promise.resolve(response));

                data.search(searchTerm)
                    .then(() => {
                        expect(requesterGetStub).to.have.been.calledWith(url);
                    })
                    .then(done, done);
            })

            it('expects search to make a GET request with (url) containing (searchTerm)', (done) => {
                requesterGetStub.returns(Promise.resolve(response));

                data.search(searchTerm)
                    .then(() => {
                        const expected = searchTerm
                        expect(requesterGetStub.args[0][0]).to.have.string(searchTerm);
                    })
                    .then(done, done);
            })
        });
});